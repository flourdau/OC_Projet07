#       OC_Projet07
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
####    *Projet 07 de la Formation Développeur Web d'Openclassrooms.*
##      Développez le back-end d'un site de notation de livres.
####    *Créez le back-end d’un site de notation de livres pour qu’il s’intègre correctement avec le front-end. Vous utilisez Node.js, Express et MongoDB.*

-   ### [OpenClassrooms Mission Details](https://openclassrooms.com/fr/paths/717/projects/1335/assignment)
-   ### [Blog post](https://blog.positive-link.net/oc_projet07)
-   ### [FrontEnd Repositories GitHub](https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres)
-   ### [Figma mockup](https://www.figma.com/file/Snidyc45xi6qchoOPabMA9/Maquette-Mon-Vieux-Grimoir?node-id=0%3A1)


##      Installation:
###     Front-End:
    git clone https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres.git frontend
    npm install
    npm start

###     Back-End:
    git clone https://github.com/flourdau/OC_Projet07.git backend
    cp .env.dist .env 

***Complet .env with your database informations***

    yarn install
    yarn start

###     Dump/Restor MongoDB & Images Tests:
    mongodump --uri mongodb+srv://<DB_USER>:<DB_PASS>@<DB_CLUSTER>.mongodb.net/
    mongorestore --uri mongodb+srv://<DB_USER>:<DB_PASS>@<DB_CLUSTER>.mongodb.net /dumpDB
    cp -Rpv ./dumpDB/images/ ./images/

##      Dependencies:
- express:***Fast, minimalist web framework for Node.js.***
- mongoose:***Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.***
- mongoose-unique-validator: ***Plugin which adds pre-save validation for unique fields within a Mongoose schema.***
- dotenv: ***Management of environment variables.***
- bcrypt: ***Encryption algorithm.***
- jsonwebtoken: ***JSON Web Token implementation.***
- multer: ***Middleware for handling multipart/form-data.***
- sharp: ***Picture optimisation. Attention the last version poses conflicts, use la 0.27.0***

##      2 Branches:
-   Main
-   Dev