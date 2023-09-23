import React from "react";
import "./ImageGenerator.css";
import header_image from "../assets/header_image.png";
import Spinner from "../loading/Spinner";
import Download from "../download/Download";
//
const ImageGenerator = () => {
    const [image, setImage_url] = React.useState("/");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDownload, setIsDownload] = React.useState(false);

    let inputRef = React.useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }

        console.log(isLoading);
        setIsLoading(true);

        const response = await fetch(
            "https://api.edenai.run/v2/image/generation",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                    process.env.REACT_APP_API_KEY,
                },
                body: JSON.stringify({
                    show_original_response: false,
                    fallback_providers: "",
                    providers: "openai,deepai,stabilityai",
                    text: `${inputRef.current.value}`,
                    resolution: "1024x1024",
                    num_images: 1,
                }),
            }
        );

        let data = await response.json();

        let data_array = data.stabilityai.items[0].image_resource_url;
        console.log("url " + data_array);

        console.log(isLoading);

        
            setIsLoading(false);
            setImage_url(data_array);
            setIsDownload(true);
        
    };

    return (
        <div className="component-body">
            <div className="header">
                AI image <span>generator</span>
            </div>

            <div className="image">
                <Spinner
                    className={isLoading ? "loading-show" : "loading-hide"}
                ></Spinner>
                <img
                    className={!isLoading ? "img-show" : "img-hide"}
                    src={image === "/" ? header_image : image}
                    alt="no response"
                />
            </div>

            <div className="input-download-bar">
                <div className="search-box">
                    <input
                        type="text"
                        ref={inputRef}
                        className="search-input"
                        placeholder="Describe what you want to Create ?"
                    />
                    <button className="generate-btn" onClick={imageGenerator}>
                        Generate
                    </button>
                </div>

                <Download className={isDownload ? "download-show" : "download-hide"} url = {image}></Download>
            </div>
        </div>
    );
};

export default ImageGenerator;
