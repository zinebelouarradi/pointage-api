/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Liste des employés
 *     description: Retourne la liste complète des employés ou les employés créés à la date spécifiée.
 *     parameters:
 *       - in: query
 *         name: creationDate
 *         schema:
 *           type: string
 *           description: filtre les employés par date de création, format dd-MM-yyyy. (optional).
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               results:
 *                 - _id: "6579bce3c7df1a834539ea7f"
 *                   id: "1234567889"
 *                   name: "Doe"
 *                   firstName: "John"
 *                   creationDate: "2023-12-13T00:00:00.000Z"
 *                   department: "Dev"
 *                   __v: 0
 *               count: 1
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 *       400:
 *         description: Bad Ruequest
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   type: "field",
 *                   value: "22-12",
 *                   msg: "Date invalide. format autorisé yyyy-MM-dd.",
 *                   path: "name",
 *                   location: "query"
 *                 }
 *               ]
 */
/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Créer un nouvel employé
 *     description: Créez un nouvel employé avec les informations fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Employee'
 *     responses:
 *       201:
 *         description: Employé créé avec succès
 *         content:
 *           application/json:
 *             example:
 *               _id: "6579e8119a6f854b8e629df3"
 *               id: "123899"
 *               name: "Doe"
 *               firstName: "John"
 *               creationDate: "2023-12-13T00:00:00.000Z"
 *               department: "string"
 *               __v: 0

 *       400:
 *         description: Bad Ruequest
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   type: "field",
 *                   value: 1,
 *                   msg: "Invalid value",
 *                   path: "name",
 *                   location: "body"
 *                 }
 *               ]
 *       409:
 *         description: Un employé avec le même ID existe déjà
 *         content:
 *           application/json:
 *             example:
 *               error: Un employé avec le même ID existe déjà
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 *
 * definitions:
 *   Employee:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: Identifiant unique de l'employé. (Requis)
 *       name:
 *         type: string
 *         description: Nom de famille de l'employé. (Requis)
 *       firstName:
 *         type: string
 *         description: Prénom de l'employé. (Requis)
 *       creationDate:
 *         type: string
 *         format: date
 *         description: Date de création de l'employé. (Optionnel)
 *       department:
 *         type: string
 *         description: Date de création de l'employé. (Optionnel)
 *     required:
 *       - id
 *       - name
 *       - firstName
 *       - department
 */

/**
 * @swagger
 * /employee/check-in:
 *   put:
 *     summary: Enregistrer l'arrivée d'un employé
 *     description: Marquer un employé comme arrivé.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *                 description: L'ID de l'employé pour effectuer l'enregistrement d'arrivée/départ. (Requis)
 *               comment:
 *                 type: string
 *                 description: Commentaire facultatif pour l'enregistrement d'arrivée/départ. (Optionnel)
 *             required:
 *               - employeeId
 *     responses:
 *       200:
 *         description: Enregistrement du départ réussi
 *         content:
 *           application/json:
 *             example:
 *               _id: "6579e8119a6f854b8e629df3"
 *               id: "1234567"
 *               name: "Doe"
 *               firstName: "John"
 *               creationDate: "2023-12-13T00:00:00.000Z"
 *               department: "HR"
 *               checkIn: "2023-12-13T08:54:38.262Z"
 *               comment: "-"
 *               __v: 0
 *       404:
 *         description: Employé introuvable
 *         content:
 *           application/json:
 *             example:
 *               error: Employé introuvable
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 *       400:
 *         description: Requête incorrecte
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   type: "field",
 *                   value: 1,
 *                   msg: "Invalid value",
 *                   path: "id",
 *                   location: "body"
 *                 }
 *               ]
 */
/**
 * @swagger
 * /employee/check-out:
 *   put:
 *     summary: Enregistrer le check out d'un employé
 *     description: Marquer un employé comme parti.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *                 description: L'ID de l'employé pour effectuer l'enregistrement de départ. (Requis)
 *               comment:
 *                 type: string
 *                 description: Commentaire facultatif pour l'enregistrement de départ. (Optionnel)
 *             required:
 *               - employeeId
 *     responses:
 *       200:
 *         description: Enregistrement du départ réussi
 *         content:
 *           application/json:
 *             example:
 *               _id: "6579e8119a6f854b8e629df3"
 *               id: "1234567"
 *               name: "Doe"
 *               firstName: "John"
 *               creationDate: "2023-12-13T00:00:00.000Z"
 *               department: "HR"
 *               checkIn: "2023-12-13T08:54:38.262Z"
 *               checkOut: "2023-12-13T17:54:38.262Z"
 *               comment: "-"
 *               hoursWorked: 8
 *               __v: 0
 *       404:
 *         description: Employé introuvable
 *         content:
 *           application/json:
 *             example:
 *               error: Employé introuvable
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 *       400:
 *         description: Requête incorrecte
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   type: "field",
 *                   value: 1,
 *                   msg: "Invalid value",
 *                   path: "id",
 *                   location: "body"
 *                 }
 *               ]
 */
