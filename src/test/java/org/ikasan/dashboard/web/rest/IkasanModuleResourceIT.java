package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.DashboardApp;
import org.ikasan.dashboard.domain.IkasanModule;
import org.ikasan.dashboard.repository.IkasanModuleRepository;
import org.ikasan.dashboard.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static org.ikasan.dashboard.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link IkasanModuleResource} REST controller.
 */
@SpringBootTest(classes = DashboardApp.class)
public class IkasanModuleResourceIT {

    private static final String DEFAULT_MODULE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MODULE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MODULE_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_MODULE_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private IkasanModuleRepository ikasanModuleRepository;

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

    private MockMvc restIkasanModuleMockMvc;

    private IkasanModule ikasanModule;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IkasanModuleResource ikasanModuleResource = new IkasanModuleResource(ikasanModuleRepository);
        this.restIkasanModuleMockMvc = MockMvcBuilders.standaloneSetup(ikasanModuleResource)
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
    public static IkasanModule createEntity(EntityManager em) {
        IkasanModule ikasanModule = new IkasanModule()
            .moduleName(DEFAULT_MODULE_NAME)
            .moduleDescription(DEFAULT_MODULE_DESCRIPTION);
        return ikasanModule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IkasanModule createUpdatedEntity(EntityManager em) {
        IkasanModule ikasanModule = new IkasanModule()
            .moduleName(UPDATED_MODULE_NAME)
            .moduleDescription(UPDATED_MODULE_DESCRIPTION);
        return ikasanModule;
    }

    @BeforeEach
    public void initTest() {
        ikasanModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createIkasanModule() throws Exception {
        int databaseSizeBeforeCreate = ikasanModuleRepository.findAll().size();

        // Create the IkasanModule
        restIkasanModuleMockMvc.perform(post("/api/ikasan-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanModule)))
            .andExpect(status().isCreated());

        // Validate the IkasanModule in the database
        List<IkasanModule> ikasanModuleList = ikasanModuleRepository.findAll();
        assertThat(ikasanModuleList).hasSize(databaseSizeBeforeCreate + 1);
        IkasanModule testIkasanModule = ikasanModuleList.get(ikasanModuleList.size() - 1);
        assertThat(testIkasanModule.getModuleName()).isEqualTo(DEFAULT_MODULE_NAME);
        assertThat(testIkasanModule.getModuleDescription()).isEqualTo(DEFAULT_MODULE_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createIkasanModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ikasanModuleRepository.findAll().size();

        // Create the IkasanModule with an existing ID
        ikasanModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIkasanModuleMockMvc.perform(post("/api/ikasan-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanModule)))
            .andExpect(status().isBadRequest());

        // Validate the IkasanModule in the database
        List<IkasanModule> ikasanModuleList = ikasanModuleRepository.findAll();
        assertThat(ikasanModuleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkModuleNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ikasanModuleRepository.findAll().size();
        // set the field null
        ikasanModule.setModuleName(null);

        // Create the IkasanModule, which fails.

        restIkasanModuleMockMvc.perform(post("/api/ikasan-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanModule)))
            .andExpect(status().isBadRequest());

        List<IkasanModule> ikasanModuleList = ikasanModuleRepository.findAll();
        assertThat(ikasanModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIkasanModules() throws Exception {
        // Initialize the database
        ikasanModuleRepository.saveAndFlush(ikasanModule);

        // Get all the ikasanModuleList
        restIkasanModuleMockMvc.perform(get("/api/ikasan-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ikasanModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].moduleName").value(hasItem(DEFAULT_MODULE_NAME.toString())))
            .andExpect(jsonPath("$.[*].moduleDescription").value(hasItem(DEFAULT_MODULE_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getIkasanModule() throws Exception {
        // Initialize the database
        ikasanModuleRepository.saveAndFlush(ikasanModule);

        // Get the ikasanModule
        restIkasanModuleMockMvc.perform(get("/api/ikasan-modules/{id}", ikasanModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ikasanModule.getId().intValue()))
            .andExpect(jsonPath("$.moduleName").value(DEFAULT_MODULE_NAME.toString()))
            .andExpect(jsonPath("$.moduleDescription").value(DEFAULT_MODULE_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIkasanModule() throws Exception {
        // Get the ikasanModule
        restIkasanModuleMockMvc.perform(get("/api/ikasan-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIkasanModule() throws Exception {
        // Initialize the database
        ikasanModuleRepository.saveAndFlush(ikasanModule);

        int databaseSizeBeforeUpdate = ikasanModuleRepository.findAll().size();

        // Update the ikasanModule
        IkasanModule updatedIkasanModule = ikasanModuleRepository.findById(ikasanModule.getId()).get();
        // Disconnect from session so that the updates on updatedIkasanModule are not directly saved in db
        em.detach(updatedIkasanModule);
        updatedIkasanModule
            .moduleName(UPDATED_MODULE_NAME)
            .moduleDescription(UPDATED_MODULE_DESCRIPTION);

        restIkasanModuleMockMvc.perform(put("/api/ikasan-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIkasanModule)))
            .andExpect(status().isOk());

        // Validate the IkasanModule in the database
        List<IkasanModule> ikasanModuleList = ikasanModuleRepository.findAll();
        assertThat(ikasanModuleList).hasSize(databaseSizeBeforeUpdate);
        IkasanModule testIkasanModule = ikasanModuleList.get(ikasanModuleList.size() - 1);
        assertThat(testIkasanModule.getModuleName()).isEqualTo(UPDATED_MODULE_NAME);
        assertThat(testIkasanModule.getModuleDescription()).isEqualTo(UPDATED_MODULE_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingIkasanModule() throws Exception {
        int databaseSizeBeforeUpdate = ikasanModuleRepository.findAll().size();

        // Create the IkasanModule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIkasanModuleMockMvc.perform(put("/api/ikasan-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanModule)))
            .andExpect(status().isBadRequest());

        // Validate the IkasanModule in the database
        List<IkasanModule> ikasanModuleList = ikasanModuleRepository.findAll();
        assertThat(ikasanModuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIkasanModule() throws Exception {
        // Initialize the database
        ikasanModuleRepository.saveAndFlush(ikasanModule);

        int databaseSizeBeforeDelete = ikasanModuleRepository.findAll().size();

        // Delete the ikasanModule
        restIkasanModuleMockMvc.perform(delete("/api/ikasan-modules/{id}", ikasanModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<IkasanModule> ikasanModuleList = ikasanModuleRepository.findAll();
        assertThat(ikasanModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IkasanModule.class);
        IkasanModule ikasanModule1 = new IkasanModule();
        ikasanModule1.setId(1L);
        IkasanModule ikasanModule2 = new IkasanModule();
        ikasanModule2.setId(ikasanModule1.getId());
        assertThat(ikasanModule1).isEqualTo(ikasanModule2);
        ikasanModule2.setId(2L);
        assertThat(ikasanModule1).isNotEqualTo(ikasanModule2);
        ikasanModule1.setId(null);
        assertThat(ikasanModule1).isNotEqualTo(ikasanModule2);
    }
}
