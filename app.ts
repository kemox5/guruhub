
import express, { Express, Request, Response, Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import roadmapRouter from './routes/roadmap';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//Routes
app.use('/', roadmapRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    "success": false,
    "message": "404"
  });

});


// error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  // console.error(err.stack)
  res.status(500).json({
    "success": false,
    "message": "500"
  });
});


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});