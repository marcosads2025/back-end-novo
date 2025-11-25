"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDog = exports.updateDog = exports.createDog = exports.getDogById = exports.getAllDogs = void 0;
const Dog_1 = __importDefault(require("../models/Dog"));
// Obter todos os cachorros
const getAllDogs = async (req, res) => {
    try {
        const dogs = await Dog_1.default.find();
        res.status(200).json(dogs);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cachorros', error });
    }
};
exports.getAllDogs = getAllDogs;
// Obter um cachorro pelo ID
const getDogById = async (req, res) => {
    try {
        const dog = await Dog_1.default.findById(req.params.id);
        if (!dog) {
            res.status(404).json({ message: 'Cachorro não encontrado' });
            return;
        }
        res.status(200).json(dog);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cachorro', error });
    }
};
exports.getDogById = getDogById;
// Criar um novo cachorro
const createDog = async (req, res) => {
    var _a;
    try {
        const { nome, raca, peso, idade, proprietario, name, breed, weight, age, owner } = req.body;
        const filename = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || null;
        const finalNome = nome !== null && nome !== void 0 ? nome : name;
        const finalRaca = raca !== null && raca !== void 0 ? raca : breed;
        const finalPeso = typeof peso !== 'undefined' ? peso : weight;
        const finalIdade = typeof idade !== 'undefined' ? idade : age;
        const finalProprietario = proprietario !== null && proprietario !== void 0 ? proprietario : owner;
        if (!finalNome || !finalRaca || finalPeso === undefined || finalIdade === undefined || !finalProprietario || !filename) {
            res.status(400).json({ message: 'Todos os campos são obrigatórios (nome, raca, peso, idade, proprietario, foto)' });
            return;
        }
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const fotoUrl = `${baseUrl}/uploads/${filename}`;
        const newDog = new Dog_1.default({
            nome: finalNome,
            raca: finalRaca,
            peso: Number(finalPeso),
            idade: Number(finalIdade),
            proprietario: finalProprietario,
            fotoUrl,
        });
        const savedDog = await newDog.save();
        res.status(201).json(savedDog);
    }
    catch (error) {
        console.error('Erro ao criar cão:', error);
        res.status(400).json({ message: 'Erro ao criar cachorro', error });
    }
};
exports.createDog = createDog;
// Atualizar um cachorro
const updateDog = async (req, res) => {
    var _a;
    try {
        const { nome, raca, peso, idade, proprietario, name, breed, weight, age, owner } = req.body;
        const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const updateData = {};
        if (nome || name)
            updateData.nome = nome !== null && nome !== void 0 ? nome : name;
        if (raca || breed)
            updateData.raca = raca !== null && raca !== void 0 ? raca : breed;
        if (typeof peso !== 'undefined' || typeof weight !== 'undefined')
            updateData.peso = Number(peso !== null && peso !== void 0 ? peso : weight);
        if (typeof idade !== 'undefined' || typeof age !== 'undefined')
            updateData.idade = Number(idade !== null && idade !== void 0 ? idade : age);
        if (proprietario || owner)
            updateData.proprietario = proprietario !== null && proprietario !== void 0 ? proprietario : owner;
        if (filename) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            updateData.fotoUrl = `${baseUrl}/uploads/${filename}`;
        }
        const updatedDog = await Dog_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedDog) {
            res.status(404).json({ message: 'Cachorro não encontrado' });
            return;
        }
        res.status(200).json(updatedDog);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar cachorro', error });
    }
};
exports.updateDog = updateDog;
// Excluir um cachorro
const deleteDog = async (req, res) => {
    try {
        const deletedDog = await Dog_1.default.findByIdAndDelete(req.params.id);
        if (!deletedDog) {
            res.status(404).json({ message: 'Cachorro não encontrado' });
            return;
        }
        res.status(200).json({ message: 'Cachorro excluído com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao excluir cachorro', error });
    }
};
exports.deleteDog = deleteDog;
