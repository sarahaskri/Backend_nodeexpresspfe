const os =require('os');


module.exports.esmFonction=async(req,res) => {
    try{
        
            res.status(200).json(esmFonction);

} catch(error){
    res.status(500).json({message:error.message});
}
}

module.exports.getOsInformation=async(req,res) => {
    try{
        const getOsInformation = {
             hostname : os.hostname(),
                osType : os.type(),
                osPlatform : os.platform(),
            
            
            }
            res.status(200).json(getOsInformation);

} catch(error){
    res.status(500).json({message:error.message});
}
}