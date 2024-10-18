export const hardcodedOptions = {
    regulation: ['Digital Operational Resilience Act (DORA)', 'UK General Data Protection Regulation (UK GDPR)', 'EU General Data Protection Regulation (EU GDPR)', 'California Consumer Privacy Act (CCPA)', 'NIS2 Directive', 'Federal Information Security Management Act (FISMA)', 'Payment Card Industry Data Security Standard (PCI DSS)', 'Health Insurance Portability and Accountability Act (HIPAA)'],
    securityControl: ['Cyber Risk Institute (CRI) Profile v2', 'Center for Internet Security (CIS) Critical Security Controls v8.1', 'NIST Cybersecurity Framework (CSF)', 'Center for Internet Security (CIS) Risk Assessment Method (RAM)', 'NIST Risk Management Framework (RMF)', 'SOC2 Type 1', 'SOC2 Type 2', 'ISO 31000 - Risk Management', 'ISO 27001'],
    companyPolicy: ['Information Security Policy v7', 'Data Privacy Policy', 'Incident Response Policy', 'Access Control Policy', 'Acceptable Use Policy'],
    customerContracts: ['Customer A - Financial Services', 'Customer B - Healthcare', 'Customer C - E-commerce', 'Prospect D - Government'],
  }
  
  export const hardcodedRequirements = [
    {
      id: '1',
      article: 'Article 4',
      subArticle: '4.1',
      regulationText: 'Establish an ICT risk management framework to cover risk identification, protection, detection, recovery, and response.',
      controlId: 'GV.OC-04.03 ',
      controlCategory: 'Governance',
      controlText: `GV.OC-04.03: Resilience requirements to support the delivery of critical services are established for all operating states (e.g., under duress/attack, during recovery, and normal operations).`,
      policyId: 'GV.OC.SSE-01',
      policyCategory: 'GOVERN / Organizational Context / Stakeholder Service Expectations',
      confidenceInterval: 95,
      policyText: `01.1. Establishment of Cyber Resilience Requirements
  01.1.1. All critical services must have defined cyber resilience requirements that support their delivery across all operating states, including under duress/attack, during recovery, and normal operations.
  01.1.2. Cyber resilience requirements must be documented and approved by the relevant Service Owner and reviewed annually.
  
  01.2. Documentation of Critical Services and Dependencies
  01.2.1. A comprehensive inventory of all critical services and their related dependencies (systems, applications, infrastructure, and third-party services) must be maintained.
  01.2.2. The inventory must be updated quarterly or upon significant changes and made accessible to authorized personnel.
  01.3. Alternative Operating Scenarios
  
  01.3.1. Reasonably expected scenarios and conditions of alternative operating states (e.g., ransomware attack, extended site recovery, site loss) must be identified and documented for each critical service.
  01.3.2. Scenario planning must include impact assessments and response strategies.
  
  01.4. Service Continuity Plans
  01.4.1. Service Continuity Plans (SCPs) must be developed for all critical services, outlining procedures to maintain or restore services during disruptions.
  01.4.2. SCPs must include roles and responsibilities, communication plans, recovery objectives, and step-by-step recovery procedures.
  01.4.3. SCPs must be reviewed, updated, and approved annually or when significant changes occur.
  
  01.5. Resiliency Testing Plans and Schedule
  01.5.1. Resiliency testing must be conducted at least annually for all critical services to validate the effectiveness of SCPs and cyber resilience measures.
  01.5.2. A testing schedule must be developed, documented, and approved by the relevant stakeholders.
  01.5.3. Test results, including identified gaps and remediation actions, must be documented and reported to senior management.
  
  01.6. Inventory Management Reporting
  01.6.1. Regular inventory management reports must be generated to verify the accuracy and completeness of critical services and their dependencies.
  01.6.2. Discrepancies identified in the inventory must be investigated and corrected promptly.
  
  01.7. Resiliency Degradation Scenarios
  01.7.1. Potential resiliency degradation scenarios must be identified for each critical service.
  01.7.2. Plans to address resiliency degradation, including mitigation strategies and contingency options, must be developed and documented.
  01.7.3. These scenarios and plans must be reviewed and updated annually.`,
      customerRequirements: [
        {
          customerId: 'Customer A - Financial Services',
          requirementText: 'Conduct quarterly resiliency testing for all critical services.',
          status: 'non-compliant',
          complianceGap: 'Current policy requires annual testing, customer requires quarterly.',
        },
        {
          customerId: 'Customer B - Healthcare',
          requirementText: 'Update inventory of critical services monthly.',
          status: 'compliant',
          complianceGap: null,
        },
      ],
    },
    {
      id: '2',
      article: 'Article 5',
      subArticle: '5.1',
      regulationText: 'Establish internal governance to manage ICT risks.',
      controlId: 'GV.RM-01.01',
      controlCategory: 'Governance',
      controlText: `GV.RM-01.01: Technology and cybersecurity risk management strategies and frameworks are approved by the governing authority (e.g., the Board or one of its committees) and incorporated into the overall business strategy and enterprise risk management framework.`,
      policyId: 'GV.RMS.RMOA-01',
      policyCategory: 'GOVERN / Risk Management Strategy / Risk Management Objectives Agreement',
      confidenceInterval: 92,
      policyText: `01.1. Board Approval of Risk Management Strategies
  01.1.1. The Board of Directors or a designated committee must review and approve technology and cybersecurity risk management strategies and frameworks annually.
  01.1.2. The approval process must be documented and include a record of any discussions, concerns raised, and resolutions.
  
  01.2. Integration with Business Strategy
  01.2.1. Technology and cybersecurity risk management strategies must be aligned with and incorporated into the overall business strategy.
  01.2.2. The integration process must be documented and reviewed annually to ensure ongoing alignment.
  
  01.3. Enterprise Risk Management Framework
  01.3.1. Technology and cybersecurity risks must be incorporated into the enterprise risk management framework.
  01.3.2. A comprehensive risk register must be maintained, including technology and cybersecurity risks, their potential impacts, and mitigation strategies.
  
  01.4. Risk Reporting
  01.4.1. Regular reports on technology and cybersecurity risks must be provided to the Board or designated committee.
  01.4.2. Reports must include key risk indicators, emerging threats, and progress on risk mitigation initiatives.
  
  01.5. Risk Management Review
  01.5.1. The effectiveness of technology and cybersecurity risk management strategies must be reviewed annually.
  01.5.2. The review must include an assessment of the strategies' alignment with business objectives and industry best practices.`,
      customerRequirements: [
        {
          customerId: 'Customer C - E-commerce',
          requirementText: 'Board review of cybersecurity strategies must occur bi-annually.',
          status: 'non-compliant',
          complianceGap: 'Current policy requires annual review, customer requires bi-annual.',
        },
        {
          customerId: 'Prospect D - Government',
          requirementText: 'Maintain a real-time risk dashboard accessible to authorized personnel.',
          status: 'non-compliant',
          complianceGap: 'Current policy does not specify real-time risk monitoring.',
        },
      ],
    },
    {
      id: '3',
      article: 'Article 5',
      subArticle: '5.4',
      regulationText: 'Allocate budget for ICT security awareness programs and training.',
      controlId: 'PR.AT-01.01',
      controlCategory: 'Protect',
      controlText: `PR.AT-01.01: All personnel receive cybersecurity awareness training upon hire and on a regular basis.`,
      policyId: 'PR.AT.UAT-01',
      policyCategory: 'PROTECT / Awareness and Training / User Awareness & Training',
      confidenceInterval: 88,
      policyText: `01.1. Cybersecurity Training Program
  01.1.1. A comprehensive cybersecurity awareness training program must be established and maintained.
  01.1.2. The program must cover topics including but not limited to: phishing, social engineering, password security, data protection, and incident reporting.
  
  01.2. Training Frequency
  01.2.1. All employees must complete cybersecurity awareness training upon hire, within 30 days of starting their position.
  01.2.2. Refresher training must be conducted annually for all employees.
  
  01.3. Role-specific Training
  01.3.1. Employees in roles with elevated access or responsibilities must receive additional, role-specific cybersecurity training.
  01.3.2. Role-specific training must be conducted bi-annually or when significant changes to responsibilities occur.
  
  01.4. Training Delivery Methods
  01.4.1. Training must be delivered through a combination of methods, including e-learning modules, in-person sessions, and simulated phishing exercises.
  01.4.2. Training effectiveness must be assessed through quizzes, practical exercises, and monitoring of security incidents.
  
  01.5. Training Records
  01.5.1. Detailed records of all cybersecurity training activities must be maintained, including attendance, completion dates, and assessment results.
  01.5.2. Training records must be reviewed quarterly to ensure compliance with training requirements.
  
  01.6. Continuous Awareness Program
  01.6.1. A continuous cybersecurity awareness program must be implemented, including regular communications, posters, and newsletters.
  01.6.2. The awareness program must be updated monthly to address current threats and trends.`,
      customerRequirements: [
        {
          customerId: 'Customer A - Financial Services',
          requirementText: 'Conduct monthly phishing simulation exercises for all employees.',
          status: 'compliant',
          complianceGap: null,
        },
        {
          customerId: 'Customer B - Healthcare',
          requirementText: 'Provide role-specific training quarterly for employees handling sensitive data.',
          status: 'non-compliant',
          complianceGap: 'Current policy requires bi-annual role-specific training, customer requires quarterly.',
        },
      ],
    },
    {
      id: '4',
      article: 'Article 7',
      subArticle: '7.1',
      regulationText: 'Use reliable and resilient ICT systems that can handle stress and peak demand.',
      controlId: 'PR.PS-01.04',
      controlCategory: 'Protect',
      controlText: `PR.PS-01.04: The organization documents its requirements for accurate and resilient time services (e.g., synchronization to a mandated or appropriate authoritative time source) and adopts best practice guidance in implementing and using these services for logging, event correlation, forensic analysis, authentication, transactional processing, and other purposes.`,
      policyId: 'PR.PS.CM-01',
      policyCategory: 'PROTECT / Platform Security / Configuration Management',
      confidenceInterval: 90,
      policyText: `01.1. Time Synchronization Requirements
  01.1.1. All systems must synchronize their clocks to an approved authoritative time source, using Network Time Protocol (NTP) or a similar standard.
  01.1.2. The authoritative time source must be accurate to within 100 milliseconds of Coordinated Universal Time (UTC).
  
  01.2. Time Service Infrastructure
  01.2.1. A resilient time service infrastructure must be implemented with at least three independent time sources.
  01.2.2. Time servers must be geographically distributed to mitigate the risk of localized failures.
  
  01.3. Time Synchronization for Critical Systems
  01.3.1. Critical systems must synchronize their time at least every 5 minutes.
  01.3.2. Time drift for critical systems must not exceed 1 second.
  
  01.4. Logging and Monitoring
  01.4.1. All systems must log time synchronization events, including successful synchronizations and failures.
  01.4.2. Time synchronization logs must be retained for at least 12 months.
  
  01.5. Security Measures
  01.5.1. NTP communications must be authenticated using symmetric key cryptography.
  01.5.2. Access to time servers must be restricted to authorized systems and personnel only.
  
  01.6. Auditing and Testing
  01.6.1. Time synchronization accuracy must be audited monthly.
  01.6.2. A full test of the time service infrastructure, including failover capabilities, must be conducted annually.`,
      customerRequirements: [
        {
          customerId: 'Customer C - E-commerce',
          requirementText: 'Maintain time synchronization accuracy within 50 milliseconds of UTC for all systems processing financial transactions.',
          status: 'non-compliant',
          complianceGap: 'Current policy specifies 100 milliseconds accuracy, customer requires 50 milliseconds for financial systems.',
        },
        {
          customerId: 'Prospect D - Government',
          requirementText: 'Implement quantum-resistant cryptography for time synchronization authentication.',
          status: 'non-compliant',
          complianceGap: 'Current policy uses symmetric key cryptography, prospect requires quantum-resistant methods.',
        },
      ],
    },
    {
      id: '5',
      article: 'Article 7',
      subArticle: '7.2',
      regulationText: 'Ensure systems are technologically resilient under adverse conditions.',
      controlId: 'RC.RP-02.01',
      controlCategory: 'Recover',
      controlText: `RC.RP-02.01: The organization's response plans are used as informed guidance to develop and manage task plans, response actions, priorities, and assignments for responding to incidents, but are adapted as necessary to address incident-specific characteristics.`,
      policyId: 'RC.RP.RAP-01',
      policyCategory: 'RECOVER / Incident Recovery Plan Execution / Recovery Action Performance',
      confidenceInterval: 85,
      policyText: `01.1. Incident Response Plan Framework
  01.1.1. A comprehensive Incident Response Plan (IRP) must be developed and maintained.
  01.1.2. The IRP must cover all phases of incident response: Preparation, Detection and Analysis, Containment, Eradication, Recovery, and Post-Incident Activities.
  
  01.2. Incident-Specific Adaptation
  01.2.1. The IRP must serve as a flexible framework that can be adapted to address specific incident characteristics.
  01.2.2. Incident response teams must document any deviations from the standard IRP and the rationale for such deviations.
  
  01.3. Task Planning and Prioritization
  01.3.1. For each incident, a specific task plan must be developed based on the IRP framework.
  01.3.2. Tasks must be prioritized based on the incident's impact, scope, and potential for escalation.
  
  01.4. Role Assignment
  01.4.1. Clear roles and responsibilities must be assigned for each incident response task.
  01.4.2. A RACI (Responsible, Accountable, Consulted, Informed) matrix must be maintained and updated for each incident.
  
  01.5. Communication and Reporting
  01.5.1. Regular status updates must be provided to stakeholders throughout the incident response process.
  01.5.2. A final incident report must be prepared within 72 hours of incident closure, detailing the incident, response actions, and lessons learned.
  
  01.6. Continuous Improvement
  01.6.1. Post-incident reviews must be conducted within one week of incident closure to identify areas for improvement in the IRP.
  01.6.2. The IRP must be updated at least annually or after any major incident, incorporating lessons learned and industry best practices.`,
      customerRequirements: [
        {
          customerId: 'Customer A - Financial Services',
          requirementText: 'Conduct quarterly tabletop exercises simulating various incident scenarios.',
          status: 'compliant',
          complianceGap: null,
        },
        {
          customerId: 'Customer B - Healthcare',
          requirementText: 'Maintain a 24/7 incident response team with less than 15-minute response time for critical incidents.',
          status: 'non-compliant',
          complianceGap: 'Current policy does not specify 24/7 coverage or response time requirements.',
        },
      ],
    },
  ]

  export const initialChatHistory = [
    {
      role: 'assistant',
      content: `Hello! I'm your Compliance Assistant. How can I help you with compliance mapping today?`
    },
    {
      role: 'user',
      content: `What is data retention for customer A?`
    },
    {
      role: 'assistant',
      content: `Based on our compliance mapping for Customer A - Financial Services, the data retention policy is as follows:\n\n- Financial transaction data: 7 years\n- Customer personal information: 5 years after the end of the business relationship\n- Communication logs: 3 years\n\nPlease note that this is specific to Customer A and may differ for other customers or regulatory requirements. Always refer to the most up-to-date customer contract and applicable regulations for the most accurate information.`
    },
    {
      role: 'user',
      content: `When does DORA go into effect? What is the fine if we are not compliant?`
    },
    {
      role: 'assistant',
      content: `The Digital Operational Resilience Act (DORA) is set to go into effect on January 17, 2025. This date marks the end of the two-year implementation period following its entry into force on January 16, 2023.\n\nRegarding fines for non-compliance, DORA specifies the following penalties:\n\n- For large financial entities: Up to €10 million or 2% of the total annual worldwide turnover for the preceding business year, whichever is higher.\n- For other financial entities: The penalties may vary but can still be substantial.\n\nIt's crucial to note that these are maximum fines, and the actual penalty would depend on the nature, gravity, and duration of the infringement, among other factors. It's strongly recommended to work towards full compliance well before the effective date to avoid any potential penalties and ensure operational resilience.`
    },
    {
      role: 'user',
      content: `How many NIS2 articles are still non-compliant with our current Info Sec policy? Provide suggestions for updates to our policy so that we can be compliant.`
    },
    {
      role: 'assistant',
      content: `Based on our current compliance mapping for the NIS2 Directive and our Information Security Policy, we have identified 3 articles that are still non-compliant. Here's a summary and suggestions for updates:\n\n1. Article 18 - Risk Analysis and Information System Security\nNon-compliance: Our current policy lacks comprehensive supply chain risk management.\nSuggestion: Update the policy to include a dedicated section on supply chain risk management, covering risk assessment of suppliers, contractual security requirements, and regular audits of critical suppliers.\n\n2. Article 20 - Incident Reporting\nNon-compliance: Our incident reporting timelines don't meet NIS2 requirements.\nSuggestion: Revise the Incident Response Policy to include:\n- Initial notification to authorities within 24 hours of incident awareness\n- Intermediate update within 72 hours\n- Final report within one month\n\n3. Article 23 - Use of European Cybersecurity Certification Schemes\nNon-compliance: Our policy doesn't address the use of certified ICT products, services, and processes.\nSuggestion: Add a new section to the Information Security Policy that:\n- Requires the use of certified ICT products, services, and processes where available and applicable\n- Establishes a process for evaluating and selecting certified options\n- Defines roles responsible for maintaining awareness of relevant certification schemes\n\nImplementing these changes will significantly improve our compliance with NIS2. Remember to involve relevant stakeholders in the policy update process and ensure proper communication and training on the new requirements across the organization.`
    }
  ]