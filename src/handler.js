//Import library nanoid
const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request,h) =>{
    const { title, tags, body } = request.payload;

    const id = nanoid(16);

    const creaatedAt = new Date().toISOString();
    const updatedAt = creaatedAt;

    const newNotes = {
        title,tags,body,id,creaatedAt,updatedAt,
    };
    notes.push(newNotes);

    const isSuccess = notes.filter((note)=>note.id === id).length>0;

    if (isSuccess){
        const response = h.response({
            status : 'success',
            message: 'Notes already Added!',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Note can not be added',
    
    });
    response.code(500);
    return response;

};
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });
const getNoteByIdHandler = (request,h)=> {
    const{id}= request.params;

    const note = notes.filter((n)=>n.id === id)[0];

    if (note !== undefined) {
        return{
            status: 'success',
            data:{
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Can not find note',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request,h)=>{
const {id}=request.params;

const index = notes.findIndex((note)=>note.id===id);

if(index !== -1){
    notes.splice(index,1);
    const response = h.response({
        status: 'success',
        message: 'Notes has been deleted',
    });
    response.code(200);
    return response;
}
const response = h.response({
    status: 'fail',
    message: 'Can not delete the note.',
})
response.code(404);
return response;

};

module.exports = {addNoteHandler,getAllNotesHandler,getNoteByIdHandler,editNoteByIdHandler,deleteNoteByIdHandler};