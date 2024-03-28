import express from 'express';
import { GenerateRoadmap } from '../controllers/roadmap';
var router = express.Router();

router.post('/generate-roadmap', function (req, res, next) {
  return GenerateRoadmap(req, res);
});

export = router;
