package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.DashboardApp;
import org.ikasan.dashboard.domain.IntegratedSystem;
import org.ikasan.dashboard.repository.IntegratedSystemRepository;
import org.ikasan.dashboard.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.ikasan.dashboard.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link IntegratedSystemResource} REST controller.
 */
@SpringBootTest(classes = DashboardApp.class)
public class IntegratedSystemResourceIT {

    private static final String DEFAULT_SYSTEM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SYSTEM_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_SYSTEM_LEVEL = 1;
    private static final Integer UPDATED_SYSTEM_LEVEL = 2;

    @Autowired
    private IntegratedSystemRepository integratedSystemRepository;

    @Mock
    private IntegratedSystemRepository integratedSystemRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restIntegratedSystemMockMvc;

    private IntegratedSystem integratedSystem;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IntegratedSystemResource integratedSystemResource = new IntegratedSystemResource(integratedSystemRepository);
        this.restIntegratedSystemMockMvc = MockMvcBuilders.standaloneSetup(integratedSystemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IntegratedSystem createEntity(EntityManager em) {
        IntegratedSystem integratedSystem = new IntegratedSystem()
            .systemName(DEFAULT_SYSTEM_NAME)
            .systemLevel(DEFAULT_SYSTEM_LEVEL);
        return integratedSystem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IntegratedSystem createUpdatedEntity(EntityManager em) {
        IntegratedSystem integratedSystem = new IntegratedSystem()
            .systemName(UPDATED_SYSTEM_NAME)
            .systemLevel(UPDATED_SYSTEM_LEVEL);
        return integratedSystem;
    }

    @BeforeEach
    public void initTest() {
        integratedSystem = createEntity(em);
    }

    @Test
    @Transactional
    public void createIntegratedSystem() throws Exception {
        int databaseSizeBeforeCreate = integratedSystemRepository.findAll().size();

        // Create the IntegratedSystem
        restIntegratedSystemMockMvc.perform(post("/api/integrated-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(integratedSystem)))
            .andExpect(status().isCreated());

        // Validate the IntegratedSystem in the database
        List<IntegratedSystem> integratedSystemList = integratedSystemRepository.findAll();
        assertThat(integratedSystemList).hasSize(databaseSizeBeforeCreate + 1);
        IntegratedSystem testIntegratedSystem = integratedSystemList.get(integratedSystemList.size() - 1);
        assertThat(testIntegratedSystem.getSystemName()).isEqualTo(DEFAULT_SYSTEM_NAME);
        assertThat(testIntegratedSystem.getSystemLevel()).isEqualTo(DEFAULT_SYSTEM_LEVEL);
    }

    @Test
    @Transactional
    public void createIntegratedSystemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = integratedSystemRepository.findAll().size();

        // Create the IntegratedSystem with an existing ID
        integratedSystem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIntegratedSystemMockMvc.perform(post("/api/integrated-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(integratedSystem)))
            .andExpect(status().isBadRequest());

        // Validate the IntegratedSystem in the database
        List<IntegratedSystem> integratedSystemList = integratedSystemRepository.findAll();
        assertThat(integratedSystemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSystemNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = integratedSystemRepository.findAll().size();
        // set the field null
        integratedSystem.setSystemName(null);

        // Create the IntegratedSystem, which fails.

        restIntegratedSystemMockMvc.perform(post("/api/integrated-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(integratedSystem)))
            .andExpect(status().isBadRequest());

        List<IntegratedSystem> integratedSystemList = integratedSystemRepository.findAll();
        assertThat(integratedSystemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIntegratedSystems() throws Exception {
        // Initialize the database
        integratedSystemRepository.saveAndFlush(integratedSystem);

        // Get all the integratedSystemList
        restIntegratedSystemMockMvc.perform(get("/api/integrated-systems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(integratedSystem.getId().intValue())))
            .andExpect(jsonPath("$.[*].systemName").value(hasItem(DEFAULT_SYSTEM_NAME.toString())))
            .andExpect(jsonPath("$.[*].systemLevel").value(hasItem(DEFAULT_SYSTEM_LEVEL)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllIntegratedSystemsWithEagerRelationshipsIsEnabled() throws Exception {
        IntegratedSystemResource integratedSystemResource = new IntegratedSystemResource(integratedSystemRepositoryMock);
        when(integratedSystemRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restIntegratedSystemMockMvc = MockMvcBuilders.standaloneSetup(integratedSystemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restIntegratedSystemMockMvc.perform(get("/api/integrated-systems?eagerload=true"))
        .andExpect(status().isOk());

        verify(integratedSystemRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllIntegratedSystemsWithEagerRelationshipsIsNotEnabled() throws Exception {
        IntegratedSystemResource integratedSystemResource = new IntegratedSystemResource(integratedSystemRepositoryMock);
            when(integratedSystemRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restIntegratedSystemMockMvc = MockMvcBuilders.standaloneSetup(integratedSystemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restIntegratedSystemMockMvc.perform(get("/api/integrated-systems?eagerload=true"))
        .andExpect(status().isOk());

            verify(integratedSystemRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getIntegratedSystem() throws Exception {
        // Initialize the database
        integratedSystemRepository.saveAndFlush(integratedSystem);

        // Get the integratedSystem
        restIntegratedSystemMockMvc.perform(get("/api/integrated-systems/{id}", integratedSystem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(integratedSystem.getId().intValue()))
            .andExpect(jsonPath("$.systemName").value(DEFAULT_SYSTEM_NAME.toString()))
            .andExpect(jsonPath("$.systemLevel").value(DEFAULT_SYSTEM_LEVEL));
    }

    @Test
    @Transactional
    public void getNonExistingIntegratedSystem() throws Exception {
        // Get the integratedSystem
        restIntegratedSystemMockMvc.perform(get("/api/integrated-systems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIntegratedSystem() throws Exception {
        // Initialize the database
        integratedSystemRepository.saveAndFlush(integratedSystem);

        int databaseSizeBeforeUpdate = integratedSystemRepository.findAll().size();

        // Update the integratedSystem
        IntegratedSystem updatedIntegratedSystem = integratedSystemRepository.findById(integratedSystem.getId()).get();
        // Disconnect from session so that the updates on updatedIntegratedSystem are not directly saved in db
        em.detach(updatedIntegratedSystem);
        updatedIntegratedSystem
            .systemName(UPDATED_SYSTEM_NAME)
            .systemLevel(UPDATED_SYSTEM_LEVEL);

        restIntegratedSystemMockMvc.perform(put("/api/integrated-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIntegratedSystem)))
            .andExpect(status().isOk());

        // Validate the IntegratedSystem in the database
        List<IntegratedSystem> integratedSystemList = integratedSystemRepository.findAll();
        assertThat(integratedSystemList).hasSize(databaseSizeBeforeUpdate);
        IntegratedSystem testIntegratedSystem = integratedSystemList.get(integratedSystemList.size() - 1);
        assertThat(testIntegratedSystem.getSystemName()).isEqualTo(UPDATED_SYSTEM_NAME);
        assertThat(testIntegratedSystem.getSystemLevel()).isEqualTo(UPDATED_SYSTEM_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingIntegratedSystem() throws Exception {
        int databaseSizeBeforeUpdate = integratedSystemRepository.findAll().size();

        // Create the IntegratedSystem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIntegratedSystemMockMvc.perform(put("/api/integrated-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(integratedSystem)))
            .andExpect(status().isBadRequest());

        // Validate the IntegratedSystem in the database
        List<IntegratedSystem> integratedSystemList = integratedSystemRepository.findAll();
        assertThat(integratedSystemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIntegratedSystem() throws Exception {
        // Initialize the database
        integratedSystemRepository.saveAndFlush(integratedSystem);

        int databaseSizeBeforeDelete = integratedSystemRepository.findAll().size();

        // Delete the integratedSystem
        restIntegratedSystemMockMvc.perform(delete("/api/integrated-systems/{id}", integratedSystem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<IntegratedSystem> integratedSystemList = integratedSystemRepository.findAll();
        assertThat(integratedSystemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntegratedSystem.class);
        IntegratedSystem integratedSystem1 = new IntegratedSystem();
        integratedSystem1.setId(1L);
        IntegratedSystem integratedSystem2 = new IntegratedSystem();
        integratedSystem2.setId(integratedSystem1.getId());
        assertThat(integratedSystem1).isEqualTo(integratedSystem2);
        integratedSystem2.setId(2L);
        assertThat(integratedSystem1).isNotEqualTo(integratedSystem2);
        integratedSystem1.setId(null);
        assertThat(integratedSystem1).isNotEqualTo(integratedSystem2);
    }
}
