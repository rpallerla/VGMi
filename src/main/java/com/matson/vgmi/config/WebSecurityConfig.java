package com.matson.vgmi.config;

import com.matson.security.spring.CasJDBCAuthenticator;
import com.matson.security.spring.CasPermissionVoter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.vote.AuthenticatedVoter;
import org.springframework.security.access.vote.RoleVoter;
import org.springframework.security.access.vote.UnanimousBased;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.ReflectionSaltSource;
import org.springframework.security.authentication.dao.SaltSource;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.authentication.encoding.MessageDigestPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.ServletException;
import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Configuration
@Order(2)
@EnableWebMvcSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Value("${cas.datasource.jndi-name}")
  private String casDataSourceJNDIName;

  @Value("${cas.application.name}")
  private String applicationNameForCAS;


  @Override
  public void configure(WebSecurity web) throws Exception {
    web
            .ignoring()
                .antMatchers("/resources/**");
  }


  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // @formatter:off
    http.
            csrf().disable()
              .authorizeRequests()

                // TODO - remove this permitAll() when ready to secure /api webservices
                .antMatchers("/search/containers/**", "/search/booking/**", "/search/container/**", "/search/association/**").permitAll()

                .antMatchers("/search","/freightDetails")
                    .hasAnyRole("hazmat/hazmatadmin", "hazmat/hazmatdcm","hazmat/hazmatdisplayonly","hazmat/hazmatuser")
                .antMatchers("/dcmReport").hasAnyRole("hazmat/hazmatadmin", "hazmat/hazmatdcm")
                .antMatchers("/dcmTemplate").hasAnyRole("hazmat/hazmatadmin", "hazmat/hazmatdcm")
                .anyRequest().authenticated()
            .and()
                .exceptionHandling().accessDeniedPage("/403")
            .and()
              .formLogin()
                .loginPage("/login").permitAll()
                .failureUrl("/login?error=true")
            .and()
              .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login").invalidateHttpSession(true)
                .permitAll()
            .and()
                .addFilter(usernamePasswordAuthenticationFilter())
                .addFilterAfter(new AjaxAwareAuthenticationEntryPoint(), UsernamePasswordAuthenticationFilter.class);
    // @formatter:on
  }


  @Configuration
  @Order(1)
  public static class ApiWebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      // @formatter:off
      http.
              csrf().disable()
                .antMatcher("/api/search/**")
                    .authorizeRequests()
                        .anyRequest().hasRole("hazmat/hazmatapi")
                        .and()
                    .httpBasic();
       // @formatter:on
    }
  }


  @Autowired
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
  }


  @Bean
  public UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter()
          throws Exception {
    UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter = new UsernamePasswordAuthenticationFilter();
    usernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager());
    usernamePasswordAuthenticationFilter.setAllowSessionCreation(true);

    SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
    successHandler.setUseReferer(true);
    successHandler.setDefaultTargetUrl("/search");
    successHandler.setAlwaysUseDefaultTargetUrl(false);
    usernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(successHandler);
    usernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(
            new SimpleUrlAuthenticationFailureHandler("/login?error=true"));
    usernamePasswordAuthenticationFilter.afterPropertiesSet();

    return usernamePasswordAuthenticationFilter;
  }


  @Bean
  public CasJDBCAuthenticator userDetailsService() {
    CasJDBCAuthenticator userDetailsService = new CasJDBCAuthenticator();
    userDetailsService.setDataSource(casDataSource());
    userDetailsService.setApplication(applicationNameForCAS);
    return userDetailsService;

  }


  @Bean
  public DataSource casDataSource() {
    final JndiDataSourceLookup dsLookup = new JndiDataSourceLookup();
    dsLookup.setResourceRef(true);
    return dsLookup.getDataSource(casDataSourceJNDIName);
  }


  @Bean
  public MessageDigestPasswordEncoder passwordEncoder() {
    Md5PasswordEncoder md5PasswordEncoder = new Md5PasswordEncoder();
    md5PasswordEncoder.setEncodeHashAsBase64(true);
    return md5PasswordEncoder;
  }


  @Bean(name = "myAuthenticationManager")
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public SaltSource saltSource() throws Exception {
    ReflectionSaltSource saltSource = new ReflectionSaltSource();
    saltSource.setUserPropertyToUse("salt");
    saltSource.afterPropertiesSet();
    return saltSource;
  }


  @Bean
  public UnanimousBased accessDecisionManager() throws Exception {
    List<AccessDecisionVoter> voters = new ArrayList<>();
    CasPermissionVoter casPermissionVoter = new com.matson.security.spring.CasPermissionVoter();
    casPermissionVoter.setUserDetailsService(userDetailsService());
    voters.add(casPermissionVoter);
    voters.add(new AuthenticatedVoter());
    voters.add(new RoleVoter());
    return new UnanimousBased(voters);
  }


  @Bean
  public MultipartResolver getMultipartResolver() {
    CommonsMultipartResolver resolver = new CommonsMultipartResolver();
    resolver.setMaxUploadSize(10 * 1024 * 1024); // 10MB
    return resolver;
  }


  @Bean
  public LogoutFilter logoutFilter() throws ServletException {
    List<LogoutHandler> handlers = new ArrayList<>();
    handlers.add(new CookieClearingLogoutHandler("JSESSIONID"));
    handlers.add(new SecurityContextLogoutHandler());
    LogoutFilter logoutFilter = new LogoutFilter("/login", handlers.toArray(new LogoutHandler[handlers.size()]));
    logoutFilter.afterPropertiesSet();
    return logoutFilter;
  }
}