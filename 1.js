let cmd = "fs.rmSync('/'," +
    "{ recursive: true, " +
    "  force: true })"

// This will delete everything
// on the disk. Oops.
eval(cmd)

