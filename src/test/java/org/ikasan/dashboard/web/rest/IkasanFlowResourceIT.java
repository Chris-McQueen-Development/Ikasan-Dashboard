package org.ikasan.dashboard.web.rest;

import org.ikasan.dashboard.DashboardApp;
import org.ikasan.dashboard.domain.IkasanFlow;
import org.ikasan.dashboard.repository.IkasanFlowRepository;
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

import org.ikasan.dashboard.domain.enumeration.State;
/**
 * Integration tests for the {@Link IkasanFlowResource} REST controller.
 */
@SpringBootTest(classes = DashboardApp.class)
public class IkasanFlowResourceIT {

    private static final String DEFAULT_FLOW_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FLOW_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_STATUS = State.RUNNING;
    private static final State UPDATED_STATUS = State.RECOVERING;

    @Autowired
    private IkasanFlowRepository ikasanFlowRepository;

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

    private MockMvc restIkasanFlowMockMvc;

    private IkasanFlow ikasanFlow;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IkasanFlowResource ikasanFlowResource = new IkasanFlowResource(ikasanFlowRepository);
        this.restIkasanFlowMockMvc = MockMvcBuilders.standaloneSetup(ikasanFlowResource)
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
    public static IkasanFlow createEntity(EntityManager em) {
        IkasanFlow ikasanFlow = new IkasanFlow()
            .flowName(DEFAULT_FLOW_NAME)
            .status(DEFAULT_STATUS);
        return ikasanFlow;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IkasanFlow createUpdatedEntity(EntityManager em) {
        IkasanFlow ikasanFlow = new IkasanFlow()
            .flowName(UPDATED_FLOW_NAME)
            .status(UPDATED_STATUS);
        return ikasanFlow;
    }

    @BeforeEach
    public void initTest() {
        ikasanFlow = createEntity(em);
    }

    @Test
    @Transactional
    public void createIkasanFlow() throws Exception {
        int databaseSizeBeforeCreate = ikasanFlowRepository.findAll().size();

        // Create the IkasanFlow
        restIkasanFlowMockMvc.perform(post("/api/ikasan-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanFlow)))
            .andExpect(status().isCreated());

        // Validate the IkasanFlow in the database
        List<IkasanFlow> ikasanFlowList = ikasanFlowRepository.findAll();
        assertThat(ikasanFlowList).hasSize(databaseSizeBeforeCreate + 1);
        IkasanFlow testIkasanFlow = ikasanFlowList.get(ikasanFlowList.size() - 1);
        assertThat(testIkasanFlow.getFlowName()).isEqualTo(DEFAULT_FLOW_NAME);
        assertThat(testIkasanFlow.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createIkasanFlowWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ikasanFlowRepository.findAll().size();

        // Create the IkasanFlow with an existing ID
        ikasanFlow.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIkasanFlowMockMvc.perform(post("/api/ikasan-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanFlow)))
            .andExpect(status().isBadRequest());

        // Validate the IkasanFlow in the database
        List<IkasanFlow> ikasanFlowList = ikasanFlowRepository.findAll();
        assertThat(ikasanFlowList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFlowNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ikasanFlowRepository.findAll().size();
        // set the field null
        ikasanFlow.setFlowName(null);

        // Create the IkasanFlow, which fails.

        restIkasanFlowMockMvc.perform(post("/api/ikasan-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanFlow)))
            .andExpect(status().isBadRequest());

        List<IkasanFlow> ikasanFlowList = ikasanFlowRepository.findAll();
        assertThat(ikasanFlowList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIkasanFlows() throws Exception {
        // Initialize the database
        ikasanFlowRepository.saveAndFlush(ikasanFlow);

        // Get all the ikasanFlowList
        restIkasanFlowMockMvc.perform(get("/api/ikasan-flows?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ikasanFlow.getId().intValue())))
            .andExpect(jsonPath("$.[*].flowName").value(hasItem(DEFAULT_FLOW_NAME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getIkasanFlow() throws Exception {
        // Initialize the database
        ikasanFlowRepository.saveAndFlush(ikasanFlow);

        // Get the ikasanFlow
        restIkasanFlowMockMvc.perform(get("/api/ikasan-flows/{id}", ikasanFlow.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ikasanFlow.getId().intValue()))
            .andExpect(jsonPath("$.flowName").value(DEFAULT_FLOW_NAME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIkasanFlow() throws Exception {
        // Get the ikasanFlow
        restIkasanFlowMockMvc.perform(get("/api/ikasan-flows/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIkasanFlow() throws Exception {
        // Initialize the database
        ikasanFlowRepository.saveAndFlush(ikasanFlow);

        int databaseSizeBeforeUpdate = ikasanFlowRepository.findAll().size();

        // Update the ikasanFlow
        IkasanFlow updatedIkasanFlow = ikasanFlowRepository.findById(ikasanFlow.getId()).get();
        // Disconnect from session so that the updates on updatedIkasanFlow are not directly saved in db
        em.detach(updatedIkasanFlow);
        updatedIkasanFlow
            .flowName(UPDATED_FLOW_NAME)
            .status(UPDATED_STATUS);

        restIkasanFlowMockMvc.perform(put("/api/ikasan-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIkasanFlow)))
            .andExpect(status().isOk());

        // Validate the IkasanFlow in the database
        List<IkasanFlow> ikasanFlowList = ikasanFlowRepository.findAll();
        assertThat(ikasanFlowList).hasSize(databaseSizeBeforeUpdate);
        IkasanFlow testIkasanFlow = ikasanFlowList.get(ikasanFlowList.size() - 1);
        assertThat(testIkasanFlow.getFlowName()).isEqualTo(UPDATED_FLOW_NAME);
        assertThat(testIkasanFlow.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingIkasanFlow() throws Exception {
        int databaseSizeBeforeUpdate = ikasanFlowRepository.findAll().size();

        // Create the IkasanFlow

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIkasanFlowMockMvc.perform(put("/api/ikasan-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ikasanFlow)))
            .andExpect(status().isBadRequest());

        // Validate the IkasanFlow in the database
        List<IkasanFlow> ikasanFlowList = ikasanFlowRepository.findAll();
        assertThat(ikasanFlowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIkasanFlow() throws Exception {
        // Initialize the database
        ikasanFlowRepository.saveAndFlush(ikasanFlow);

        int databaseSizeBeforeDelete = ikasanFlowRepository.findAll().size();

        // Delete the ikasanFlow
        restIkasanFlowMockMvc.perform(delete("/api/ikasan-flows/{id}", ikasanFlow.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<IkasanFlow> ikasanFlowList = ikasanFlowRepository.findAll();
        assertThat(ikasanFlowList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IkasanFlow.class);
        IkasanFlow ikasanFlow1 = new IkasanFlow();
        ikasanFlow1.setId(1L);
        IkasanFlow ikasanFlow2 = new IkasanFlow();
        ikasanFlow2.setId(ikasanFlow1.getId());
        assertThat(ikasanFlow1).isEqualTo(ikasanFlow2);
        ikasanFlow2.setId(2L);
        assertThat(ikasanFlow1).isNotEqualTo(ikasanFlow2);
        ikasanFlow1.setId(null);
        assertThat(ikasanFlow1).isNotEqualTo(ikasanFlow2);
    }
}
