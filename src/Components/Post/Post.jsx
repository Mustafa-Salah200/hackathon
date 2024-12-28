import "./Post.css";
import location from "../../assets/location_icon.svg";
import file from "../../assets/file_icon.svg";

const Post = () => {
  return (
    <section className="post">
      <h1 className="title">Post Emergency</h1>
      <form action="#">
        <div className="input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value=""
            placeholder="Enter Title ..."
          />
        </div>

        <div className="input">
          <label htmlFor="category">Category</label>
          <select name="category" id="">
            <option value="fire">Fire</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="level">Level</label>
          <select name="level" id="">
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="danger">Danger</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            value=""
            placeholder="Enter Description ..."
          />
        </div>

        <div className="btn">
          <div className="file-upload">
            <img src={file} alt="" />
            <input type="file" name="photo" id="upload" />
            <label htmlFor="upload">Upload Photo</label>
          </div>
          <button>
            <img src={location} alt="" />
            Add Location
          </button>
        </div>

        <div className="check">
          <input type="checkbox" name="" id="check1" />
          <label htmlFor="check1">Include my Contact information</label>
        </div>
        <div className="check">
          <input type="checkbox" name="" id="check2" />
          <label htmlFor="check2">I accept the terms and conditions</label>
        </div>

        <button className="submit" type="submit">
          Submit Emergency
        </button>
      </form>
    </section>
  );
};

export default Post;
