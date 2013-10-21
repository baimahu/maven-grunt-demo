Maven Grunt Demo
================

Maven-grunt demo is a simple J2EE web project using maven as full management and gruntjs in front-end.

How to build a new project using maven and grunt
-----------

In order to build this project, you need to pre install [Maven](http://maven.apache.org/download.cgi), [Node.js](http://nodejs.org/download/), [Ant](http://ant.apache.org/bindownload.cgi) and JAVA enviroment.


### - Pre-install

__Maven__

```bash
 tar -zvxf apache-maven-3.1.1-bin.tar.gz
 cp apache-maven-3.1.1-bin /opt
 vi /etc/profile
```

 export MAVEN_HOME, config $PATH setting:
```
 export MAVEN_HOME=/opt/apache-maven-3.1.1-bin
 export PATH=$PATH:$MAVEN_HOME/bin
```
 check Maven valiable:

```bash
mvn -version
```

__Ant__

Similiar to Maven install.


__Node.js__ & __NPM__ (node package management)

When you install Node.js, you need to confirm already installed python,gcc & g++.

### - build

go into the project folder, open the terminal and enter
```bash
npm install
```
to prepare install grunt and related node modules.

#### 1. development mode: only need to watch JSP-INF files change
Open the terminal and tap code below, we can watch 
```bash
grunt watch
```
You only need to watch jsp-inf folder jsps change, deploy on an J2EE web container to develop.

#### 2. deployment mode: maven package

```bash
mvn clean package -P deploy
```
It'll auto-call grunt to compile static resources such as HTML pages, JS, CSS, Image compression which are defined in **_Gruntfile.js_** file, and auto deploy to maven target related folder.

Also, if you want to see the original JavaScript resources when running with deployment mode, you can run `grunt jsresource` to listen resource JS files.

Why use ant to run grunt in maven
----------

This is a workaround for maven-autorun-plugin call ant directly caught some unknown issue.
I just simply call an ant file outside instead.

Questions?
----------

If you have any questions and feedbacks, please feel free to send email to me.