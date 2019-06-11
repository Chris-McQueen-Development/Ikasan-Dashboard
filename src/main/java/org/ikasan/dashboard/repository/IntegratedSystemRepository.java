package org.ikasan.dashboard.repository;

import org.ikasan.dashboard.domain.IntegratedSystem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the IntegratedSystem entity.
 */
@Repository
public interface IntegratedSystemRepository extends JpaRepository<IntegratedSystem, Long> {

    @Query(value = "select distinct integratedSystem from IntegratedSystem integratedSystem left join fetch integratedSystem.modules",
        countQuery = "select count(distinct integratedSystem) from IntegratedSystem integratedSystem")
    Page<IntegratedSystem> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct integratedSystem from IntegratedSystem integratedSystem left join fetch integratedSystem.modules")
    List<IntegratedSystem> findAllWithEagerRelationships();

    @Query("select integratedSystem from IntegratedSystem integratedSystem left join fetch integratedSystem.modules where integratedSystem.id =:id")
    Optional<IntegratedSystem> findOneWithEagerRelationships(@Param("id") Long id);

}
