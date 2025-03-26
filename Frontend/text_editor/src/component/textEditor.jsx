import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import axios from 'axios';

function TextEditor({user, token}) {
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();

      if (!title.trim()) {
        setMessage('Title is required');
        return;
      }

      try {
        // const response = await axios.post('http://localhost:8000/upload', { 
          const response = await axios.post('/upload', { 
          title,   // Sending title  
          content,  // Sending content
          "userEmail":user.email,
        },{ // Configuration object starts here
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        setMessage(response.data.message);
      } catch (error) {
        console.error('Error saving document:', error);
        setMessage('Failed to save document');
      }
    }
  };

  return (
    <div style={{marginTop:"8vh"}}>
      {/* Input for Title */}
      <input
        type="text"
        placeholder="Enter Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />

      {/* TinyMCE Editor */}
      <Editor
        apiKey="lmvj7re7qvonvd2nvj4w4pppuxri6h7trdem3u0qq8c9d1ef" // Replace with actual TinyMCE API key
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: true,
          plugins: 'advlist autolink lists link charmap print preview anchor',
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
        }}
      />

      {/* Save Button */}
      <button onClick={handleSave} style={{ marginTop: '10px' }}>
        Save to Google Drive
      </button>

      <p style={{color:"green"}}>{message}</p>
    </div>
  );
}

export default TextEditor;

