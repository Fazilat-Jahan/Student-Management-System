#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let students = [];
let condition = true;
async function fastAnimate(text, delay = 10) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}
await fastAnimate(chalk.white.bold(`\n\n<--------------------------Welcome To IT HUB SMS - Student Management System-------------------------->\n\n`));
async function SMS() {
    while (condition) {
        let options = await inquirer.prompt({
            name: "opt",
            type: "list",
            message: "--------------------",
            choices: ["Enroll Student", "Courses", "Pay Tution Fee", "Student Status", "View Balance", "Exit"]
        });
        if (options.opt == "Enroll Student") {
            let studentName = await inquirer.prompt({
                name: "named",
                type: "input",
                message: "Enter Student Name To Enroll:"
            });
            if (studentName.named == false) {
                await fastAnimate(chalk.white.bold(`\nPlease Enter Student Name First To Enroll in SMS.\n\n`));
            }
            else {
                let id = Math.floor(Math.random() * 10000) + 10000;
                await fastAnimate(chalk.white.bold(`\nStudent ${studentName.named.charAt(0).toUpperCase() + studentName.named.slice(1).toLowerCase()} Enrolled With ID ${id}\n\n`));
                students.push({ name: studentName.named, id: id, balance: 5000, courses: [] });
                // console.log(students);
            }
        }
        else if (options.opt == "Courses") {
            let studentSelection = await inquirer.prompt({
                name: "sselect",
                type: "list",
                message: "Select Student To Get Enroll In Course(s):",
                choices: students.map((item) => `${item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} (${item.id})`)
            });
            let selectedStudent = students.find((item) => `${item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} (${item.id})` === studentSelection.sselect);
            // console.log(selectedStudent);
            let coursesy = await inquirer.prompt({
                name: "selection",
                type: "checkbox",
                message: "Select Courses:",
                choices: ["Generative AI Engineering", "Artifical Intelligence", "Cyber Security", "Internet Of Things"]
            });
            if (coursesy.selection == false) {
                await fastAnimate(chalk.white.bold(`\nPlease Select Your Course First To Get Enroll in SMS.\n\n`));
            }
            else {
                selectedStudent.courses = coursesy.selection;
                await fastAnimate(chalk.white.bold(`\nStudent ${studentSelection.sselect} Successfully Enrolled In Course(s) In ${coursesy.selection.join(`, `)}\n\n`));
                // console.log(students);
            }
        }
        else if (options.opt == "Pay Tution Fee") {
            let studentSelection = await inquirer.prompt({
                name: "sselect",
                type: "list",
                message: "Select Student To Pay tution Fee",
                choices: students.map((item) => `${item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} (${item.id})`)
            });
            let selectedStudent = students.find((item) => `${item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} (${item.id})` === studentSelection.sselect);
            let Tution = await inquirer.prompt({
                name: "fee",
                type: "list",
                message: "Select Your Enrolled Course",
                choices: selectedStudent.courses
            });
            let fee = 0;
            if (Tution.fee == "Generative AI Engineering") {
                fee = 800;
            }
            else if (Tution.fee == "Artifical Intelligence") {
                fee = 1000;
            }
            else if (Tution.fee == "Cyber Security") {
                fee = 700;
            }
            else if (Tution.fee == "Internet Of Things") {
                fee = 500;
            }
            console.log(`\nYour Current Month Tution Fees Is ${fee}\n`);
            if (selectedStudent.balance >= fee) {
                selectedStudent.balance -= fee;
                await fastAnimate(chalk.white.bold(`You've Successfully Paid Your Tution Fee \n\n`));
                // await fastAnimate(chalk.white.bold(`Your Current Balance Is ${selectedStudent.balance}$\n\n`));
            }
            else {
                await fastAnimate(chalk.white.bold(`Insufficient Balance! Your Current Balance is ${selectedStudent.balance}$ Please Recharge Your Balance.\n\n`));
                await fastAnimate(chalk.white.bold(`Please Pay Your Tution Fee Within Due Date, Else You'll Be Charged Up By 100$\n\n`));
            }
        }
        else if (options.opt == "Student Status") {
            let studentSelection = await inquirer.prompt({
                name: "sselect",
                type: "list",
                message: "Select Student To Get Student Status:",
                choices: students.map((item) => `${item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} (${item.id})`)
            });
            let selectedStudent = students.find((item) => `${item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} (${item.id})` === studentSelection.sselect);
            await fastAnimate(chalk.white.bold(`\n<------------------------------Student Status--------------------------------->\n\n \n Student Name: ${selectedStudent.name.charAt(0).toUpperCase() + selectedStudent.name.slice(1).toLowerCase()} \n\n Student ID: ${selectedStudent.id} \n\n Student Enrolled Course(s): ${selectedStudent.courses.join(`, `)} \n\n Student Current Balance: ${selectedStudent.balance}$\n\n`));
        }
        else if (options.opt == "View Balance") {
            let studentSelection = await inquirer.prompt({
                name: "sselect",
                type: "list",
                message: "Select Student To View Student Balance:",
                choices: students.map((item) => `${item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} (${item.id})`)
            });
            let selectedStudent = students.find((item) => `${item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} (${item.id})` === studentSelection.sselect);
            await fastAnimate(chalk.white.bold(`\n ${selectedStudent.name.charAt(0).toUpperCase() + selectedStudent.name.slice(1).toLowerCase()}'s Current Balance Is ${selectedStudent.balance}$ \n\n`));
        }
        else if (options.opt == "Exit") {
            condition = false;
            let develporName = chalk.white.underline ` Fazilat Jahan `;
            await fastAnimate(chalk.white.bold(`\n Exiting IT HUB Student Management System.......\n\n\n<----------------------------------Developed By: ${develporName}-------------------------------------->\n\n`));
        }
    }
}
SMS();
