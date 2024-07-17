const Project = require('../models/projectModel');

// Create a new project
const createProject = async (req, res) => {
  const { name, description, startDate, endDate, owner } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      owner: req.user.id 
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getProjects = async (req, res) => {
    try{
        const projects = await Project.find({owner :req.user.id})
        res.json(projects)
    }catch(err){
        res.status(500).send("Server error");
    }};

const updateProject = async(req,res)=>{
    const {id}  = req.params;
    const {name,description,startDate,endDate,owner} = req.body
    try{
      const project = await Project.findByIdAndUpdate(
        id,
        {name,description,startDate,endDate,owner:req.user.id},
        {new :true,runValidators:true}
    );
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    };

    const deleteProject = async (req, res) => {
        const { id } = req.params;
      
        try {
          // Find the project by ID and delete it
          const project = await Project.findByIdAndDelete(id);
      
          if (!project) {
            return res.status(404).json({ message: 'Project not found' });
          }
      
          res.json({ message: 'Project deleted' });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      };


module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects
};
