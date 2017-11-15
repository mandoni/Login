var express = require('express');
var router = express.Router();
var User = require('../models/users'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('', { title: 'Inicio' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Registrarse' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'iniciar secion' });
});

router.get('/inicio', function(req, res, next) {
  res.render('inicio', { title: 'Inicio' });
});

router.post('/signup', function(req, res){
  var userName = req.body.username;
  var name = req.body.nombre;
  var password = req.body.password;

  var newUser = new User();
  newUser.userName = userName;
  newUser.name = name;
  newUser.password = newUser.cryptPassword(password);
  newUser.save(function(err, user){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    console.log('Ingresado exitosamente')
    return res.status(200).send();  
  });
  res.render('inicio', { title: 'Inicio' });
})

router.post('/login',function(req, res){
  var userName = req.body.username;
  var password = req.body.password;

  User.findOne({userName: userName, password: password}, function(err, user){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    if(!user){
      res.render('login', {mensaje: 'No se encontró', title:'Iniciar secion'})
      return res.status(404).send();
    }
    return res.status(200).send()
  })
});

module.exports = router;
