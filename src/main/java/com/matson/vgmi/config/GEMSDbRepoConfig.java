/**
 * 
 */
package com.matson.vgmi.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author nsalbarde
 *
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "gemsEntityManagerFactory",
        transactionManagerRef = "gemsTransactionManager",
        basePackages = {"com.matson.gems.dao"})
public class GEMSDbRepoConfig {

    @Value("${gems.datasource.hibernate.dialect}")
    private String dialect;
    
    @Value("${spring.jpa.show-sql}")
    private boolean jspShowSQLFlag;
    
    @Value("${gems.datasource.jndi-name}")
    private String hazDataSourceJNDIName;

    @Bean
    public DataSource gemsDataSource() {
    	final JndiDataSourceLookup dsLookup = new JndiDataSourceLookup();
        dsLookup.setResourceRef(true);
        return dsLookup.getDataSource(hazDataSourceJNDIName);
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean gemsEntityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(gemsDataSource());
        em.setPackagesToScan("com.matson.gems.model");
        em.setJpaVendorAdapter(getJpaVendorAdapter());
        em.setJpaProperties(additionalProperties());
        return em;
    }

    Properties additionalProperties() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", dialect);
        properties.setProperty("eclipselink.weaving", "false");
        return properties;
    }
    
    JpaVendorAdapter getJpaVendorAdapter(){
    	EclipseLinkJpaVendorAdapter elJpaVendorAdapter = new EclipseLinkJpaVendorAdapter();
        elJpaVendorAdapter.setDatabase(Database.ORACLE);
        elJpaVendorAdapter.setShowSql(jspShowSQLFlag);
        return elJpaVendorAdapter;
    }
    
    @Bean
    public PlatformTransactionManager gemsTransactionManager() {
        return new JpaTransactionManager(gemsEntityManagerFactory().getObject());
    }
}