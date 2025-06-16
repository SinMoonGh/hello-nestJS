import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
     it("sholud return an array", () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
     })
  })

  describe("getOne", () => {
    it('moive를 정상적으로 반환합니다', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      })

      const moive = service.getOne(1);
      expect(moive).toBeDefined();
      expect(moive.id).toEqual(1);
    })

    it('id가 존재하지 않으면 error를 출력하는 지 확인합니다', () => {
      expect(() => {
        service.getOne(2);
      }).toThrow(NotFoundException);
    })
  })

  describe("deleteOne", () => {
    it("제대로 delete 됐는 지 확인합니다.", () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      })
      
      expect(() => {
        const allMovies = service.getAll();
        service.deleteOne(1);
        const afterDelete = service.getAll();

        expect(afterDelete.length).toEqual(allMovies.length - 1);
      })
    })

    it('404를 뱉는 지 확인합니다.', () => {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('create', ()=> {
    it('모든 멤버가 정확히 생성되는 지 check', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      })

      const afterCreate = service.getAll().length;
      expect(afterCreate).toBe(beforeCreate + 1);
      
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Test Movie');
      expect(movie.year).toEqual(2000);
      expect(movie.genres).toEqual(['test']);
    })
  })

  describe('update', () => {
    it('movie 멤버가 update 됐는 지 확인', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      })

      const updateData = {
        title: 'update Movie',
        year: 1000,
      }

      service.update(1, updateData);
      const upDateMovie = service.getOne(1);
      
      expect(upDateMovie.title).toEqual('update Movie');
      expect(upDateMovie.year).toEqual(1000);
    })

    it('404를 뱉는 지 확인합니다.', () => {
      try{
        service.update(999, {});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
