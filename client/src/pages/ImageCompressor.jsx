// src/pages/ImageCompressor.jsx
import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";


/* ---------- Helpers ---------- */
const prettyBytes = (bytes) => {
  if (!bytes && bytes !== 0) return "-";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0)} ${units[i]}`;
};

const getExtForOutput = (outputFormat) =>
  outputFormat === "image/webp" ? ".webp" : outputFormat === "image/png" ? ".png" : ".jpg";

/**
 * Compress using canvas (FileReader -> Image -> draw -> toBlob)
 * returns a Promise<Blob>
 */
const compressImageFile = (file, { quality = 0.8, maxWidth = null, outputType = "image/jpeg" } = {}) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // compute size keeping aspect ratio
        let targetWidth = img.width;
        let targetHeight = img.height;
        if (maxWidth && img.width > maxWidth) {
          const ratio = maxWidth / img.width;
          targetWidth = Math.round(img.width * ratio);
          targetHeight = Math.round(img.height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // toBlob callback
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Compression failed"));
            resolve(blob);
          },
          outputType,
          quality
        );
      };
      img.onerror = () => reject(new Error("Invalid image file"));
      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
};

/* ---------- Component ---------- */
const ImageCompressor = () => {
  const [files, setFiles] = useState([]); // items: { file, originalUrl, originalSize, compressedBlob, compressedUrl, compressedSize }
  const [quality, setQuality] = useState(0.8);
  const [outputFormat, setOutputFormat] = useState("image/jpeg");
  const [maxWidth, setMaxWidth] = useState(1920);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = async (fileList) => {
    const arr = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!arr.length) return;
    const withPreview = arr.map((file) => ({
      file,
      originalUrl: URL.createObjectURL(file),
      originalSize: file.size,
      compressedBlob: null,
      compressedUrl: null,
      compressedSize: 0,
    }));
    setFiles((prev) => [...prev, ...withPreview]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dtFiles = e.dataTransfer.files;
    handleFiles(dtFiles);
  };

  const onSelectFiles = (e) => {
    if (!e.target.files) return;
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const startCompression = async (index = null) => {
    const targets = index === null ? files.map((_, i) => i) : [index];
    setProcessing(true);
    try {
      // We'll clone files and update progressively
      const newFiles = [...files];
      for (const i of targets) {
        const item = newFiles[i];
        if (!item) continue;
        // compress
        const blob = await compressImageFile(item.file, {
          quality,
          maxWidth: maxWidth ? Number(maxWidth) : null,
          outputType: outputFormat,
        });
        const blobUrl = URL.createObjectURL(blob);

        // revoke old compressed url if exists
        if (newFiles[i].compressedUrl) URL.revokeObjectURL(newFiles[i].compressedUrl);

        newFiles[i] = {
          ...newFiles[i],
          compressedBlob: blob,
          compressedUrl: blobUrl,
          compressedSize: blob.size,
        };

        // update progress to user
        setFiles((prev) => {
          const copy = [...prev];
          copy[i] = newFiles[i];
          return copy;
        });
      }
    } catch (err) {
      console.error(err);
      alert("Compression failed. See console for details.");
    } finally {
      setProcessing(false);
    }
  };

  const removeItem = (i) => {
    const item = files[i];
    if (item) {
      if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
    }
    setFiles((prev) => {
      const copy = [...prev];
      copy.splice(i, 1);
      return copy;
    });
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    files.forEach((it) => {
      if (it.compressedBlob) {
        const ext = getExtForOutput(outputFormat);
        downloadBlob(it.compressedBlob, `${it.file.name.replace(/\.[^/.]+$/, "")}-compressed${ext}`);
      }
    });
  };

  const clearAll = () => {
    files.forEach((f) => {
      if (f.originalUrl) URL.revokeObjectURL(f.originalUrl);
      if (f.compressedUrl) URL.revokeObjectURL(f.compressedUrl);
    });
    setFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <Helmet>
        <title>Pixy Tools | Image Compressor</title>
        <meta
          name="description"
          content="Compress images directly in your browser. Choose format, quality, and max width. No files leave your device."
        />
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">🖼️ Image Compressor</h1>
        <p className="text-center text-gray-600 mb-8">
          Compress images in the browser — choose format, quality and max width. No files leave the device.
        </p>

        <div
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 mb-6 bg-white shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-gray-700 mb-2">Drag & drop images here or</p>
              <div className="flex gap-3">
                <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
                  Choose files
                  <input ref={inputRef} type="file" accept="image/*" multiple onChange={onSelectFiles} className="hidden" />
                </label>
                <button onClick={() => inputRef.current && inputRef.current.click()} className="inline-block border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                  Browse
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Supported: JPEG, PNG, WebP. Try keeping max width ≤ 1920 for best results.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-md">
                <label className="block text-sm text-gray-600 mb-1">Format</label>
                <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} className="w-full border border-gray-200 rounded-md p-2">
                  <option value="image/jpeg">JPEG (good compatibility)</option>
                  <option value="image/webp">WebP (best compression)</option>
                  <option value="image/png">PNG (lossless)</option>
                </select>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <label className="block text-sm text-gray-600 mb-1">Quality ({Math.round(quality * 100)}%)</label>
                <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <label className="block text-sm text-gray-600 mb-1">Max width (px)</label>
                <input type="number" value={maxWidth} onChange={(e) => setMaxWidth(e.target.value)} placeholder="e.g. 1920" className="w-full border border-gray-200 rounded-md p-2" />
              </div>
            </div>
          </div>
        </div>

        {/* files list */}
        <div className="space-y-4">
          {files.length === 0 && <div className="bg-white p-6 rounded-md text-center text-gray-500">No images selected yet.</div>}

          {files.map((it, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-48 flex-shrink-0">
                <img src={it.originalUrl} alt="preview" className="w-full h-40 object-contain rounded-md border" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-gray-800">{it.file.name}</div>
                    <div className="text-sm text-gray-500">{prettyBytes(it.originalSize)}</div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => startCompression(idx)} disabled={processing} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                      {processing ? "Processing..." : "Compress"}
                    </button>
                    <button onClick={() => removeItem(idx)} className="border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-50">
                      Remove
                    </button>
                  </div>
                </div>

                {it.compressedUrl ? (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <div className="text-sm text-gray-600">Compressed preview</div>
                      <img src={it.compressedUrl} alt="compressed" className="w-full h-28 object-contain rounded-md border" />
                    </div>

                    <div className="col-span-1">
                      <div className="text-sm text-gray-600">Original size</div>
                      <div className="text-gray-800">{prettyBytes(it.originalSize)}</div>
                    </div>

                    <div className="col-span-1">
                      <div className="text-sm text-gray-600">Compressed size</div>
                      <div className="text-gray-800">{prettyBytes(it.compressedSize)}</div>
                      <div className="text-sm text-gray-500 mt-1">Saved: {it.originalSize ? Math.round(((it.originalSize - it.compressedSize) / it.originalSize) * 100) : 0}%</div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => downloadBlob(it.compressedBlob, `${it.file.name.replace(/\.[^/.]+$/, "")}-compressed${getExtForOutput(outputFormat)}`)} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-gray-500">Compressed version not ready yet.</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {files.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <button onClick={() => startCompression(null)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Compress All
            </button>
            <button onClick={downloadAll} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Download All
            </button>
            <button onClick={clearAll} className="border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50">
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
