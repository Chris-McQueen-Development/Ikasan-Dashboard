package org.ikasan.dashboard.repository;

import org.ikasan.dashboard.domain.IkasanModule;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IkasanModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IkasanModuleRepository extends JpaRepository<IkasanModule, Long> {

}
