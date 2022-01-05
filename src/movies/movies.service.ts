import { Injectable, NotFoundException } from '@nestjs/common';
import { INSTANCE_ID_SYMBOL } from '@nestjs/core/injector/instance-wrapper';
import { timeStamp } from 'console';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];
    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id:number):Movie {
        const movie = this.movies.find(movie => movie.id ===id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id:number){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        // filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
        // return true;
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({
            ...movie,
            ...updateData
        })
    }
}
