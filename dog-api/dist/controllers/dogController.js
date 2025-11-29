// Criar um novo cachorro
export const createDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nome,
      raca,
      idade,
      peso,
      proprietario,
      name,
      breed,
      age,
      weight,
      owner,
    } = req.body;

    const file = (req as any).file?.filename || null;

    // Mapeamento seguro
    const finalNome = nome ?? name;
    const finalRaca = raca ?? breed;
    const finalIdade = idade ?? age;
    const finalPeso = peso ?? weight;
    const finalProprietario = proprietario ?? owner;

    // Validação — AGORA ESTÁ CORRETA
    if (!finalNome || !finalRaca || finalIdade == null || finalPeso == null || !finalProprietario || !file) {
      res.status(400).json({
        message:
          "Todos os campos são obrigatórios (nome, raca, peso, idade, proprietario, foto)",
      });
      return;
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const fotoUrl = `${baseUrl}/uploads/${file}`;

    const newDog = new Dog({
      nome: finalNome,
      raca: finalRaca,
      idade: Number(finalIdade),
      peso: Number(finalPeso),
      proprietario: finalProprietario,
      fotoUrl,
    });

    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    console.error("Erro ao criar cão:", error);
    res.status(400).json({ message: "Erro ao criar cachorro", error });
  }
};
