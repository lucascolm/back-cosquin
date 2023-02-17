const { Router } = require('express');
const jugadores=require("./jugadores");
const masJugadores=require("./masJugadores");

const {Jugadores,MasJugadores}=require("../db");
const { route } = require('./jugadores');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.get("/",async(req,res)=>{
  console.log(Jugadores)
 try {
  let allJugadores= await Jugadores.findAll();
  res.status(200).json(allJugadores)
 } catch (error) {
  return res.status(404).send(error.message);
 }
})

router.post("/",async(req, res)=>{
  try {
    console.log("estoy en el post")
    const{puntuacion,nombre,email}=req.body;
    console.log(puntuacion,nombre,email)
    let nuevoJugador=await Jugadores.create({
      puntuacion: puntuacion,
      nombre: nombre,
      email: email
    }) 
    res.status(200).json(nuevoJugador);
  } catch (error) {
    res.status(400).json(error.message);
  }
  
})

router.post("/s21",async(req,res)=>{
  try {
    console.log("estoy en el post")
    const{puntuacion,nombre,email}=req.body;
    console.log(puntuacion,nombre,email)
    let nuevoJugador=await MasJugadores.create({
      puntuacion: puntuacion,
      nombre: nombre,
      email: email
    }) 
    res.status(200).json(nuevoJugador);
  } catch (error) {
    res.status(400).json(error.message);
  }
  
})

router.get('/s21',async(req, res)=>{
  console.log(Jugadores)
  try {
   let allJugadores= await MasJugadores.findAll();
   res.status(200).json(allJugadores)
  } catch (error) {
   return res.status(404).send(error.message);
  }
  
})
router.use("/jugadores",jugadores)
router.use("/masJugadores",masJugadores)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
