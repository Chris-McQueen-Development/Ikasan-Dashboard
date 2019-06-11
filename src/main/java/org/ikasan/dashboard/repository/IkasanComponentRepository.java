package org.ikasan.dashboard.repository;

import org.ikasan.dashboard.domain.IkasanComponent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IkasanComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IkasanComponentRepository extends JpaRepository<IkasanComponent, Long> {

}
