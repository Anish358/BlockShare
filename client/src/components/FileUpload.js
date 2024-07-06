import { useState } from "react";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        const newfile = createReadStream(file);
        formData.append("file", newfile);

        const URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        console.log(process.env.REACT_APP_PINATA_JWT);

        // console.log("here");
        const res = await fetch(URL, {
          method: "POST",
          data: formData,
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        console.log(res);
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    setFileName("No image selected");
    setFile(null);
  };

  const retrieveFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      setFile(arrayBuffer);
    };

    reader.onerror = (error) => {
      console.error("FileReader error:", error);
    };

    if (file instanceof Blob) {
      reader.readAsArrayBuffer(file);
      setFileName(file.name);
    } else {
      console.error("Expected a Blob but received:", file);
    }

    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;
