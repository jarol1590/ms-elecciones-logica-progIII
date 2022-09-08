import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Bloque,
BloqueVotante,
Votante,
} from '../models';
import {BloqueRepository} from '../repositories';

export class BloqueVotanteController {
  constructor(
    @repository(BloqueRepository) protected bloqueRepository: BloqueRepository,
  ) { }

  @get('/bloques/{id}/votantes', {
    responses: {
      '200': {
        description: 'Array of Bloque has many Votante through BloqueVotante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Votante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Votante>,
  ): Promise<Votante[]> {
    return this.bloqueRepository.votantes(id).find(filter);
  }

  @post('/bloques/{id}/votantes', {
    responses: {
      '200': {
        description: 'create a Votante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Votante)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Bloque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votante, {
            title: 'NewVotanteInBloque',
            exclude: ['id'],
          }),
        },
      },
    }) votante: Omit<Votante, 'id'>,
  ): Promise<Votante> {
    return this.bloqueRepository.votantes(id).create(votante);
  }

  @patch('/bloques/{id}/votantes', {
    responses: {
      '200': {
        description: 'Bloque.Votante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votante, {partial: true}),
        },
      },
    })
    votante: Partial<Votante>,
    @param.query.object('where', getWhereSchemaFor(Votante)) where?: Where<Votante>,
  ): Promise<Count> {
    return this.bloqueRepository.votantes(id).patch(votante, where);
  }

  @del('/bloques/{id}/votantes', {
    responses: {
      '200': {
        description: 'Bloque.Votante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Votante)) where?: Where<Votante>,
  ): Promise<Count> {
    return this.bloqueRepository.votantes(id).delete(where);
  }
}
