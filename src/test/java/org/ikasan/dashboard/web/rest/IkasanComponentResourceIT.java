package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.DashboardApp;
import org.ikasan.dashboard.domain.IkasanComponent;
import org.ikasan.dashboard.repository.IkasanComponentRepository;
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
 * Integration tests for the {@Link IkasanComponentResource} REST controller.
 */
@SpringBootTest(classes = DashboardApp.class)
public class IkasanComponentResourceIT {

    private static final String DEFAULT_COMPONENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPONENT_NAME = "BBBBBBBBBB";

    @Autowired
    private IkasanComponentRepository ikasanComponentRepository;

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

    private MockMvc restIkasanComponentMockMvc;

    private IkasanComponent ikasanComponent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IkasanComponentResource ikasanComponentResource = new IkasanComponentResource(ikasanComponentRepository);
        this.restIkasanComponentMockMvc = MockMvcBuilders.standaloneSetup(ikasanComponentResource)
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
    public static IkasanComponent createEntity(EntityManager em) {
        IkasanComponent ikasanComponent = new IkasanComponent()
            .componentName(DEFAULT_COMPONENT_NAME);
        return ikasanComponent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IkasanComponent createUpdatedEntity(EntityManager em) {
        IkasanComponent ikasanComponent = new IkasanComponent()
            .componentName(UPDATED_COMPONENT_NAME);
        return ikasanComponent;
    }

    @BeforeEach
    public void initTest() {
        ikasanComponent = createEntity(em);
    }

    @Test
    @Transactional
    public void createIkasanComponent() throws Exception {
        int databaseSizeBeforeCreate = ikasanComponentRepository.findAll().size();

        // Create the IkasanComponent
        restIkasanComponentMockMvc.perform(post("/api/ikasan-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanComponent)))
            .andExpect(status().isCreated());

        // Validate the IkasanComponent in the database
        List<IkasanComponent> ikasanComponentList = ikasanComponentRepository.findAll();
        assertThat(ikasanComponentList).hasSize(databaseSizeBeforeCreate + 1);
        IkasanComponent testIkasanComponent = ikasanComponentList.get(ikasanComponentList.size() - 1);
        assertThat(testIkasanComponent.getComponentName()).isEqualTo(DEFAULT_COMPONENT_NAME);
    }

    @Test
    @Transactional
    public void createIkasanComponentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ikasanComponentRepository.findAll().size();

        // Create the IkasanComponent with an existing ID
        ikasanComponent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIkasanComponentMockMvc.perform(post("/api/ikasan-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanComponent)))
            .andExpect(status().isBadRequest());

        // Validate the IkasanComponent in the database
        List<IkasanComponent> ikasanComponentList = ikasanComponentRepository.findAll();
        assertThat(ikasanComponentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkComponentNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ikasanComponentRepository.findAll().size();
        // set the field null
        ikasanComponent.setComponentName(null);

        // Create the IkasanComponent, which fails.

        restIkasanComponentMockMvc.perform(post("/api/ikasan-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanComponent)))
            .andExpect(status().isBadRequest());

        List<IkasanComponent> ikasanComponentList = ikasanComponentRepository.findAll();
        assertThat(ikasanComponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIkasanComponents() throws Exception {
        // Initialize the database
        ikasanComponentRepository.saveAndFlush(ikasanComponent);

        // Get all the ikasanComponentList
        restIkasanComponentMockMvc.perform(get("/api/ikasan-components?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ikasanComponent.getId().intValue())))
            .andExpect(jsonPath("$.[*].componentName").value(hasItem(DEFAULT_COMPONENT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getIkasanComponent() throws Exception {
        // Initialize the database
        ikasanComponentRepository.saveAndFlush(ikasanComponent);

        // Get the ikasanComponent
        restIkasanComponentMockMvc.perform(get("/api/ikasan-components/{id}", ikasanComponent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ikasanComponent.getId().intValue()))
            .andExpect(jsonPath("$.componentName").value(DEFAULT_COMPONENT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIkasanComponent() throws Exception {
        // Get the ikasanComponent
        restIkasanComponentMockMvc.perform(get("/api/ikasan-components/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIkasanComponent() throws Exception {
        // Initialize the database
        ikasanComponentRepository.saveAndFlush(ikasanComponent);

        int databaseSizeBeforeUpdate = ikasanComponentRepository.findAll().size();

        // Update the ikasanComponent
        IkasanComponent updatedIkasanComponent = ikasanComponentRepository.findById(ikasanComponent.getId()).get();
        // Disconnect from session so that the updates on updatedIkasanComponent are not directly saved in db
        em.detach(updatedIkasanComponent);
        updatedIkasanComponent
            .componentName(UPDATED_COMPONENT_NAME);

        restIkasanComponentMockMvc.perform(put("/api/ikasan-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIkasanComponent)))
            .andExpect(status().isOk());

        // Validate the IkasanComponent in the database
        List<IkasanComponent> ikasanComponentList = ikasanComponentRepository.findAll();
        assertThat(ikasanComponentList).hasSize(databaseSizeBeforeUpdate);
        IkasanComponent testIkasanComponent = ikasanComponentList.get(ikasanComponentList.size() - 1);
        assertThat(testIkasanComponent.getComponentName()).isEqualTo(UPDATED_COMPONENT_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingIkasanComponent() throws Exception {
        int databaseSizeBeforeUpdate = ikasanComponentRepository.findAll().size();

        // Create the IkasanComponent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIkasanComponentMockMvc.perform(put("/api/ikasan-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanComponent)))
            .andExpect(status().isBadRequest());

        // Validate the IkasanComponent in the database
        List<IkasanComponent> ikasanComponentList = ikasanComponentRepository.findAll();
        assertThat(ikasanComponentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIkasanComponent() throws Exception {
        // Initialize the database
        ikasanComponentRepository.saveAndFlush(ikasanComponent);

        int databaseSizeBeforeDelete = ikasanComponentRepository.findAll().size();

        // Delete the ikasanComponent
        restIkasanComponentMockMvc.perform(delete("/api/ikasan-components/{id}", ikasanComponent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<IkasanComponent> ikasanComponentList = ikasanComponentRepository.findAll();
        assertThat(ikasanComponentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IkasanComponent.class);
        IkasanComponent ikasanComponent1 = new IkasanComponent();
        ikasanComponent1.setId(1L);
        IkasanComponent ikasanComponent2 = new IkasanComponent();
        ikasanComponent2.setId(ikasanComponent1.getId());
        assertThat(ikasanComponent1).isEqualTo(ikasanComponent2);
        ikasanComponent2.setId(2L);
        assertThat(ikasanComponent1).isNotEqualTo(ikasanComponent2);
        ikasanComponent1.setId(null);
        assertThat(ikasanComponent1).isNotEqualTo(ikasanComponent2);
    }
}
