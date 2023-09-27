import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


const start = async() => {
  try {
    const app = await NestFactory.create(AppModule);

    const PORT = process.env.PORT || 3000

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
    .setTitle("Stadium Project")
    .setDescription("REST API")
    .setVersion('1.0.0')
    .addTag("NestJs, Postgress, Sequelize")
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs",app,document);

    await app.listen(PORT, () => {
      console.log(`Server Listen on ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
}
start()