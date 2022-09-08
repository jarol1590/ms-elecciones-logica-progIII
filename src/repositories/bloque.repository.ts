import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Bloque, BloqueRelations, Votante, BloqueVotante} from '../models';
import {BloqueVotanteRepository} from './bloque-votante.repository';
import {VotanteRepository} from './votante.repository';

export class BloqueRepository extends DefaultCrudRepository<
  Bloque,
  typeof Bloque.prototype.id,
  BloqueRelations
> {

  public readonly votantes: HasManyThroughRepositoryFactory<Votante, typeof Votante.prototype.id,
          BloqueVotante,
          typeof Bloque.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BloqueVotanteRepository') protected bloqueVotanteRepositoryGetter: Getter<BloqueVotanteRepository>, @repository.getter('VotanteRepository') protected votanteRepositoryGetter: Getter<VotanteRepository>,
  ) {
    super(Bloque, dataSource);
    this.votantes = this.createHasManyThroughRepositoryFactoryFor('votantes', votanteRepositoryGetter, bloqueVotanteRepositoryGetter,);
    this.registerInclusionResolver('votantes', this.votantes.inclusionResolver);
  }
}
