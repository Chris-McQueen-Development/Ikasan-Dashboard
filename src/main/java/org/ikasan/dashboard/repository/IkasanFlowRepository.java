package org.ikasan.dashboard.repository;

import org.ikasan.dashboard.domain.IkasanFlow;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IkasanFlow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IkasanFlowRepository extends JpaRepository<IkasanFlow, Long> {

}
