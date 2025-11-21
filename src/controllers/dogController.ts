import Dog from '../models/Dog.js'; // ⚠️ ATENÇÃO: Tem que ter o .js no final

// Obter todos os cães
export const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cães', error });
  }
};

// Obter um cão pelo ID
export const getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).json({ message: 'Cão não encontrado' });
    }
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cão', error });
  }
};

// Criar um novo cão
export const createDog = async (req, res) => {
  try {
    // Debug no Log do Render para ver o que está chegando
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { nome, raca, peso, idade, proprietario } = req.body;

    // Validação simples
    if (!nome || !raca) {
        return res.status(400).json({ message: "Nome e Raça são obrigatórios" });
    }

    let fotoUrl = '';
    
    if (req.file) {
      // Se estamos usando memoryStorage (configuração anterior), usamos originalname
      fotoUrl = `uploads/${req.file.originalname}`;
    }

    // Convertendo idade e peso para número caso venham como string do formulário
    const newDog = new Dog({
      nome,
      raca,
      peso: Number(peso),
      idade: Number(idade),
      proprietario,
      fotoUrl 
    });

    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    console.error("Erro ao criar:", error); // Log importante
    res.status(400).json({ message: 'Erro ao criar cão', error: error.message });
  }
};

// Atualizar um cão
export const updateDog = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Se o usuário enviou uma nova foto
    if (req.file) {
      updateData.fotoUrl = `uploads/${req.file.originalname}`;
    }

    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedDog) {
      return res.status(404).json({ message: 'Cão não encontrado' });
    }
    res.status(200).json(updatedDog);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cão', error });
  }
};

// Excluir um cão
export const deleteDog = async (req, res) => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) {
      return res.status(404).json({ message: 'Cão não encontrado' });
    }
    res.status(200).json({ message: 'Cão excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cão', error });
  }
};
