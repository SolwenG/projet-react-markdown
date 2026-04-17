export default function ImageUploadForm({
  fileName,
  selectedFile,
  onFileChange,
  onFileNameChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto mb-8 px-4"
    >
      <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-black rounded-sm px-4 py-2 text-sm">
        <span>Choisir un fichier</span>
        <input
          type="file"
          accept="image/*,.img.mdlc,.imgs.mdlc"
          onChange={onFileChange}
          className="hidden"
        />
      </label>
      <input
        type="text"
        placeholder="Nom du fichier"
        value={fileName}
        onChange={onFileNameChange}
        className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={!selectedFile}
        className="bg-green-700 text-white disabled:cursor-not-allowed rounded-lg px-4 py-2 text-sm"
      >
        Ajouter
      </button>
    </form>
  )
}
