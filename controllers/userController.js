const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

module.exports.addUserAdherent=async(req,res) => {
    try{
        const {firstname,lastname,email,password,age} = req.body;
        const role = "adherent";
        const user = await userSchema.create({firstname,lastname,email,password,role:role,age});
            res.status(200).json({user});

} catch(error){
    res.status(500).json({message:error.message});
}
}

module.exports.addUserAdmin=async(req,res) => {
    try{
        const {firstname,lastname,email,password,age} = req.body;
        const role = "admin";
        const user = await userSchema.create({firstname,lastname,email,password,role:role,age});
            res.status(200).json({user});

} catch(error){
    res.status(500).json({message:error.message});
}
}
module.exports.getAllUsers=async(req,res) => {
    try{
        const users = await userSchema.find();
            res.status(200).json(users);

} catch(error){
    res.status(500).json({message:error.message});
}
}



module.exports.getUserById=async(req,res) => {
    try{
        const id = req.params.id;
        const user = await userSchema.findById(id);
            res.status(200).json(user);
  
} catch(error){
    res.status(500).json({message:error.message});
}
}  



module.exports.deleteUserById=async(req,res) => {
    try{
        const id = req.params.id;
        const checkifExist = await userSchema.findById(id);
        if(!checkifExist){
            res.status(404).json({message:"user not found"});
        }
        const user = await userSchema.findByIdAndDelete(id);
        
            res.status(200).json(user);

} catch(error){
    res.status(500).json({message:error.message});
}
} 
module.exports.addUserAdherentWithImg=async(req,res) => {
    try{
        const {firstname,lastname,email,password} = req.body;
        const role = "adherent";
        const {file_name} = req.file
        const user = await userSchema.create({firstname,lastname,email,password,role:role,user_image:file_name});
            res.status(200).json({user});

} catch(error){
    res.status(500).json({message:error.message});
}
} 

module.exports.upDateAdherent=async(req,res) => {
    try{
        const id = req.params.id;
       

            res.status(200).json(esmFonction);

} catch(error){
    res.status(500).json({message:error.message});
}
} 
exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        // Vérifier si l'utilisateur existe
        const user = await userSchema.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        // Vérifier si l'email est modifié et déjà utilisé
        if (updates.email && updates.email !== user.email) {
            const existingUser = await userSchema.findOne({ email: updates.email });
            if (existingUser) {
                return res.status(400).json({ message: "Cet email est déjà utilisé" });
            }
        }

        //  Mise à jour des données
        const updatedUser = await userSchema.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        res.status(200).json({ message: "Utilisateur mis à jour avec succès", user: updatedUser });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports.searchByUserName = async (req, res) => {
    try {
        const { firstname } = req.body;

        if (!firstname) {
            return res.status(400).json({ message: "firstname is required" });
        }

        const users = await userSchema.find({ firstname: { $regex: firstname, $options: 'i' } });

        if (users.length === 0) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json({ count: users.length, users });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllUsersByAge=async(req,res) => {
    try{
        const users = await userSchema.find().sort({age:1});
            res.status(200).json(users);

} catch(error){
    res.status(500).json({message:error.message});
}
}