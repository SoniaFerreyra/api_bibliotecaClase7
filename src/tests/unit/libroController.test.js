//Prueba funciones del controller, pero sin afectar a la bbdd
const {
    getAllLibros,
    createLibro,
    updateLibro,
    deleteLibro,
    getLibroById,
} = require("../../controllers/libroController");


const libroModel = require("../../models/libroModel");

// Crea el mockup de libroModel para las pruebas
jest.mock("../../models/libroModel");
//Agrupa las pruebas en un describe
describe("Libro Controller", () => {
    //Crea el objeto mockRes de respuesta para las pruebas
    let mockRes;
    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    // Pruebas para getAllLibros
    test("getLibros debería obtener todos los libros", async () => {
        const mockLibros = [
            { id: "1", title: "Libro 1" },
            { id: "2", title: "Libro 2" },
        ];
        libroModel.find.mockResolvedValue(mockLibros);
        const mockReq = {};
        await getAllLibros(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibros);
    });
    // Pruebas para getLibroById
    test("getLibroById debería obtener un libro", async () => {
        const mockLibro = {
            id: "1", titulo: "Libro Encontrado", autor:
                "Juan Perez"
        };
        libroModel.findById.mockResolvedValue(mockLibro);
        const mockReq = { params: { id: "1" } };
        await getLibroById(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });
    // Pr_Test para createLibro
    test("createLibro debería crear un nuevo libro", async () => {
        const mockLibro = {
            id: "1", titulo: "Nuevo Libro", autor: "Juan Perez"
        };
        mockLibro.save = () => { };
        libroModel.create.mockResolvedValue(mockLibro);
        const mockReq = { body: mockLibro };
        await createLibro(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });
    // Pr_Test para updateLibro
    test("updateLibro debería actualizar un libro existente", async () => {
        const libroId = '1';
        const libroActualizado = {
            titulo: 'Libro Actualizado', autor:
                'Autor Actualizado'
        };
        const libroActualizadoMock = { _id: libroId, ...libroActualizado };
        libroModel.findByIdAndUpdate.mockResolvedValue(libroActualizadoMock);
        const mockReq = { params: { id: "1" }, body: libroActualizado };
        await updateLibro(mockReq, mockRes);
        expect(libroModel.findByIdAndUpdate).toHaveBeenCalledWith(libroId,
            libroActualizado, { new: true });
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(libroActualizadoMock);
    });
    // Pr_Test para deleteLibro si el libro no existe
    test("updateLibro debería devolver un error si el libro no existe",
        async () => {
            libroModel.findByIdAndUpdate.mockResolvedValue(null);
            const mockReq = {
                params: { id: "99" },
                body: { titulo: "Libro Actualizado" },
            };
            await updateLibro(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: "Libro no encontrado"
            });
        });
        // Pr_Test para deleteLibro
    test("deleteLibro debería eliminar un libro existente", async () => {
        const mockLibroEliminado = {
            titulo: 'Libro Eliminado', autor:
                'Autor Eliminado'
        };
        libroModel.findByIdAndRemove.mockResolvedValue(mockLibroEliminado);
        const mockReq = { params: { id: "1" } };
        await deleteLibro(mockReq, mockRes);
        expect(libroModel.findByIdAndRemove).toHaveBeenCalledWith(mockReq.params
            .id);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibroEliminado);
    });
});