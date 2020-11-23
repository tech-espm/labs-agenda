import express = require("express");
import wrap = require("express-async-error-wrapper");
import Evento = require("../models/evento");
import Professor = require("../models/professor");
import Sala = require("../models/sala");
import Turma = require("../models/turma");
import Usuario = require("../models/usuario");
import appsettings = require("../appsettings");

const router = express.Router();

router.all("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin)
		res.redirect(appsettings.root + "/acesso");
	else
		res.render("evento/alterar", {
			titulo: "Criar Evento",
			usuario: u,
			professores: await Professor.listar(),
			salas: await Sala.listar(),
			turmas: await Turma.listar(),
			item: null
		});
}));

router.all("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin) {
		res.redirect(appsettings.root + "/acesso");
	} else {
		let id = parseInt(req.query["id_evento"] as string);
		let item: Evento = null;
		if (isNaN(id) || !(item = await Evento.obter(id)))
			res.render("home/nao-encontrado", { usuario: u });
		else
			res.render("evento/alterar", {
				titulo: "Editar Evento",
				usuario: u,
				professores: await Professor.listar(),
				salas: await Sala.listar(),
				turmas: await Turma.listar(),
				item: item
			});
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let u = await Usuario.cookie(req);
	if (!u || !u.admin)
		res.redirect(appsettings.root + "/acesso");
	else{
		res.render("evento/listar", {
			titulo: "Gerenciar Eventos",
			usuario: u,
			lista: JSON.stringify(await Evento.listar()),
			turmas: await Turma.listar()
		});
	}
		
		
}));


export = router;
