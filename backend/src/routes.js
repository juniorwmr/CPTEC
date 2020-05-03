const router = require("express").Router();

const PeritoController = require("./controllers/PeritoController");
const PericiaController = require("./controllers/PericiaController");
const EspecialidadeController = require("./controllers/EspecialidadeController");
const DocumentoController = require("./controllers/DocumentoController");
const MagistradoController = require("./controllers/MagistradoController");
const AvaliacaoController = require("./controllers/AvaliacaoController");
const ComarcaController = require("./controllers/ComarcaController");
const Tipo_documentoController = require("./controllers/Tipo_documentoController");

// Perito
router.get("/perito", PeritoController.index);
router.get("/perito/:page", PeritoController.index_paginate);
router.get("/perito/cpf", PeritoController.index_by_cpf);
router.get("/perito/cnpj", PeritoController.index_by_cnpj);
router.post("/perito", PeritoController.store);

// Pericia
router.get("/pericia", PericiaController.index);
router.get("/pericia/:page", PericiaController.index_paginate);
router.get("/pericia/:id_perito", PericiaController.show);
router.post("/pericia", PericiaController.store);

// Especialidade
router.get("/especialidade", EspecialidadeController.index);
router.get("/especialidade/:page", EspecialidadeController.index_paginate);
router.post("/especialidade", EspecialidadeController.storeOne);
router.post("/especialidade/perito", EspecialidadeController.store);

// Documento
router.get("/documento", DocumentoController.index);
router.get("/documento/:id_perito/:page", DocumentoController.index_paginate);
router.post("/documento", DocumentoController.store);

// Tipo_documento
router.get("/tipo_documento", Tipo_documentoController.index);
router.post("/tipo_documento", Tipo_documentoController.store);

// Comarca
router.get("/comarca", ComarcaController.index);
router.get("/comarca/:page", ComarcaController.index_paginate);
router.post("/comarca", ComarcaController.store);
router.post("/comarca/:id_perito", ComarcaController.storePerito);
router.post("/comarca/:id_pericia", ComarcaController.storePericia);

// Avaliação
router.get("/avaliacao", AvaliacaoController.index);
router.get("/avaliacao/:page", AvaliacaoController.index_paginate);
router.post("/avaliacao", AvaliacaoController.store);

// Magistrado
router.get("/magistrado", MagistradoController.index);
router.get("/magistrado/:page", MagistradoController.index_paginate);
router.post("/magistrado/", MagistradoController.storeOne);
router.post("/magistrado/:id_pericia", MagistradoController.store);

module.exports = router;
