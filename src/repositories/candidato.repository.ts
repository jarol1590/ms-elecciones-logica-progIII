import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Candidato, CandidatoRelations, Movimiento} from '../models';
import {MovimientoRepository} from './movimiento.repository';

export class CandidatoRepository extends DefaultCrudRepository<
  Candidato,
  typeof Candidato.prototype.id,
  CandidatoRelations
> {

  public readonly movimiento: BelongsToAccessor<Movimiento, typeof Candidato.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MovimientoRepository') protected movimientoRepositoryGetter: Getter<MovimientoRepository>,
  ) {
    super(Candidato, dataSource);
    this.movimiento = this.createBelongsToAccessorFor('movimiento', movimientoRepositoryGetter,);
    this.registerInclusionResolver('movimiento', this.movimiento.inclusionResolver);
  }
}
