import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform: true, 
      /*
        localhost:#000/movie/1 이렇게 하면 1이 string으로 들어오고
        string 값을 number 로 바꿔주는 작업이 필요한데 transform = true로 하면
        자동으로 바꿔줌
      */
    })
  )
  await app.listen(3000);
}
bootstrap();
