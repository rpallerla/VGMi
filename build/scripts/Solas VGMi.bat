@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  Solas VGMi startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

@rem Add default JVM options here. You can also use JAVA_OPTS and SOLAS_VG_MI_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args
if "%@eval[2+2]" == "4" goto 4NT_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*
goto execute

:4NT_args
@rem Get arguments from the 4NT Shell from JP Software
set CMD_LINE_ARGS=%$

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\Solas VGMi-0.0.1.jar;%APP_HOME%\lib\spring-boot-starter-data-jpa-1.2.5.RELEASE.jar;%APP_HOME%\lib\jackson-databind-2.4.6.jar;%APP_HOME%\lib\spring-hateoas-0.17.0.RELEASE.jar;%APP_HOME%\lib\mysql-connector-java-5.1.28.jar;%APP_HOME%\lib\spring-boot-starter-thymeleaf-1.2.5.RELEASE.jar;%APP_HOME%\lib\spring-boot-starter-security-1.2.5.RELEASE.jar;%APP_HOME%\lib\spring-security-taglibs-3.2.0.RELEASE.jar;%APP_HOME%\lib\eclipselink-2.6.0-M3.jar;%APP_HOME%\lib\ojdbc-14.jar;%APP_HOME%\lib\jaxp-ri-1.4.5.jar;%APP_HOME%\lib\thymeleaf-extras-springsecurity3-2.1.2.RELEASE.jar;%APP_HOME%\lib\cas-spring-security-1.1.0.jar;%APP_HOME%\lib\cas-common-security-3.0.2.jar;%APP_HOME%\lib\groovy-json-2.4.4.jar;%APP_HOME%\lib\gson-2.2.4.jar;%APP_HOME%\lib\spring-ws-core-2.2.1.RELEASE.jar;%APP_HOME%\lib\nekohtml-1.9.21.jar;%APP_HOME%\lib\chemistry-opencmis-client-impl-0.7.0.jar;%APP_HOME%\lib\alfresco-opencmis-extension-0.3.jar;%APP_HOME%\lib\commons-fileupload-1.3.1.jar;%APP_HOME%\lib\itextpdf-5.5.6.jar;%APP_HOME%\lib\core-renderer-R8.jar;%APP_HOME%\lib\cas-ftp-3.1.4.jar;%APP_HOME%\lib\commons-net-3.3.jar;%APP_HOME%\lib\httpclient-4.5.jar;%APP_HOME%\lib\spring-boot-starter-mail-1.2.5.RELEASE.jar;%APP_HOME%\lib\tomcat-embed-jasper-8.0.23.jar;%APP_HOME%\lib\jstl-1.2.jar;%APP_HOME%\lib\spring-boot-starter-1.2.5.RELEASE.jar;%APP_HOME%\lib\spring-boot-starter-aop-1.2.5.RELEASE.jar;%APP_HOME%\lib\spring-core-4.1.7.RELEASE.jar;%APP_HOME%\lib\spring-boot-starter-jdbc-1.2.5.RELEASE.jar;%APP_HOME%\lib\hibernate-entitymanager-4.3.10.Final.jar;%APP_HOME%\lib\javax.transaction-api-1.2.jar;%APP_HOME%\lib\spring-orm-4.1.7.RELEASE.jar;%APP_HOME%\lib\spring-data-jpa-1.7.3.RELEASE.jar;%APP_HOME%\lib\spring-aspects-4.1.7.RELEASE.jar;%APP_HOME%\lib\jackson-annotations-2.4.0.jar;%APP_HOME%\lib\jackson-core-2.4.6.jar;%APP_HOME%\lib\objenesis-2.1.jar;%APP_HOME%\lib\spring-boot-starter-web-1.2.5.RELEASE.jar;%APP_HOME%\lib\thymeleaf-spring4-2.1.4.RELEASE.jar;%APP_HOME%\lib\thymeleaf-layout-dialect-1.2.9.jar;%APP_HOME%\lib\spring-expression-4.1.7.RELEASE.jar;%APP_HOME%\lib\spring-security-config-3.2.7.RELEASE.jar;%APP_HOME%\lib\spring-security-web-3.2.7.RELEASE.jar;%APP_HOME%\lib\spring-security-acl-3.2.0.RELEASE.jar;%APP_HOME%\lib\javax.persistence-2.1.0.jar;%APP_HOME%\lib\commonj.sdo-2.1.1.jar;%APP_HOME%\lib\jaxp-api-1.4.5.jar;%APP_HOME%\lib\spring-xml-2.2.1.RELEASE.jar;%APP_HOME%\lib\spring-oxm-4.0.9.RELEASE.jar;%APP_HOME%\lib\xercesImpl-2.10.0.jar;%APP_HOME%\lib\chemistry-opencmis-client-api-0.7.0.jar;%APP_HOME%\lib\chemistry-opencmis-commons-api-0.7.0.jar;%APP_HOME%\lib\chemistry-opencmis-commons-impl-0.7.0.jar;%APP_HOME%\lib\chemistry-opencmis-client-bindings-0.7.0.jar;%APP_HOME%\lib\org.osgi.core-1.0.0.jar;%APP_HOME%\lib\commons-io-2.2.jar;%APP_HOME%\lib\itext-2.0.8.jar;%APP_HOME%\lib\httpcore-4.4.1.jar;%APP_HOME%\lib\spring-context-support-4.1.7.RELEASE.jar;%APP_HOME%\lib\javax.mail-1.5.4.jar;%APP_HOME%\lib\tomcat-embed-core-8.0.23.jar;%APP_HOME%\lib\tomcat-embed-el-8.0.23.jar;%APP_HOME%\lib\ecj-4.4.2.jar;%APP_HOME%\lib\spring-boot-1.2.5.RELEASE.jar;%APP_HOME%\lib\spring-boot-autoconfigure-1.2.5.RELEASE.jar;%APP_HOME%\lib\spring-boot-starter-logging-1.2.5.RELEASE.jar;%APP_HOME%\lib\snakeyaml-1.14.jar;%APP_HOME%\lib\aspectjrt-1.8.6.jar;%APP_HOME%\lib\aspectjweaver-1.8.6.jar;%APP_HOME%\lib\spring-jdbc-4.1.7.RELEASE.jar;%APP_HOME%\lib\tomcat-jdbc-8.0.23.jar;%APP_HOME%\lib\spring-tx-4.1.7.RELEASE.jar;%APP_HOME%\lib\jboss-logging-3.1.3.GA.jar;%APP_HOME%\lib\jboss-logging-annotations-1.2.0.Beta1.jar;%APP_HOME%\lib\hibernate-core-4.3.10.Final.jar;%APP_HOME%\lib\dom4j-1.6.1.jar;%APP_HOME%\lib\hibernate-commons-annotations-4.0.5.Final.jar;%APP_HOME%\lib\hibernate-jpa-2.1-api-1.0.0.Final.jar;%APP_HOME%\lib\javassist-3.18.1-GA.jar;%APP_HOME%\lib\spring-data-commons-1.9.3.RELEASE.jar;%APP_HOME%\lib\jcl-over-slf4j-1.7.12.jar;%APP_HOME%\lib\spring-boot-starter-tomcat-1.2.5.RELEASE.jar;%APP_HOME%\lib\hibernate-validator-5.1.3.Final.jar;%APP_HOME%\lib\aopalliance-1.0.jar;%APP_HOME%\lib\xml-apis-1.4.01.jar;%APP_HOME%\lib\bcmail-jdk14-138.jar;%APP_HOME%\lib\bcprov-jdk14-138.jar;%APP_HOME%\lib\activation-1.1.jar;%APP_HOME%\lib\jul-to-slf4j-1.7.12.jar;%APP_HOME%\lib\log4j-over-slf4j-1.7.12.jar;%APP_HOME%\lib\logback-classic-1.1.3.jar;%APP_HOME%\lib\tomcat-juli-8.0.23.jar;%APP_HOME%\lib\antlr-2.7.7.jar;%APP_HOME%\lib\jandex-1.1.0.Final.jar;%APP_HOME%\lib\tomcat-embed-logging-juli-8.0.23.jar;%APP_HOME%\lib\tomcat-embed-websocket-8.0.23.jar;%APP_HOME%\lib\validation-api-1.1.0.Final.jar;%APP_HOME%\lib\classmate-1.0.0.jar;%APP_HOME%\lib\logback-core-1.1.3.jar;%APP_HOME%\lib\spring-beans-4.1.7.RELEASE.jar;%APP_HOME%\lib\spring-context-4.1.7.RELEASE.jar;%APP_HOME%\lib\spring-web-4.1.7.RELEASE.jar;%APP_HOME%\lib\spring-aop-4.1.7.RELEASE.jar;%APP_HOME%\lib\slf4j-api-1.7.12.jar;%APP_HOME%\lib\groovy-2.4.4.jar;%APP_HOME%\lib\jaxws-rt-2.1.7.jar;%APP_HOME%\lib\jaxws-api-2.1.jar;%APP_HOME%\lib\jaxb-impl-2.1.11.jar;%APP_HOME%\lib\saaj-impl-1.3.3.jar;%APP_HOME%\lib\streambuffer-0.9.jar;%APP_HOME%\lib\wstx-asl-3.2.3.jar;%APP_HOME%\lib\resolver-20050927.jar;%APP_HOME%\lib\mimepull-1.3.jar;%APP_HOME%\lib\jaxb-api-2.1.jar;%APP_HOME%\lib\saaj-api-1.3.jar;%APP_HOME%\lib\stax-api-1.0.1.jar;%APP_HOME%\lib\stax-api-1.0-2.jar;%APP_HOME%\lib\commons-codec-1.9.jar;%APP_HOME%\lib\spring-webmvc-4.1.7.RELEASE.jar;%APP_HOME%\lib\thymeleaf-2.1.4.RELEASE.jar;%APP_HOME%\lib\ognl-3.0.8.jar;%APP_HOME%\lib\unbescape-1.1.0.RELEASE.jar;%APP_HOME%\lib\spring-security-core-3.2.7.RELEASE.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\stax-ex-1.7.7.jar

@rem Execute Solas VGMi
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %SOLAS_VG_MI_OPTS%  -classpath "%CLASSPATH%" com.matson.haz.Application %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable SOLAS_VG_MI_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%SOLAS_VG_MI_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
