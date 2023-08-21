const { spawn } = require("child_process");
const router = require("express").Router();

router.post("/run-model", (req, res) => {
  const inputData = JSON.stringify(req.body);
  console.log(inputData);

  const pythonProcess = spawn("python", ["./Linkedin_app.py", inputData]);

  let outputData = "";

  pythonProcess.stdout.on("data", (data) => {
    const output = data.toString();
    outputData += output;
    // Process the output if needed
    // console.log("nodejs output", output);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    if (code === 0) {
      // Successful execution
      res.status(200).json({
        success: true,
        message: "Python script executed successfully",
        output: outputData,
      });
    } else {
      // Error in execution
      res.status(500).json({
        success: false,
        message: "An error occurred during execution",
        output: outputData,
      });
    }
  });
});

module.exports = router;
