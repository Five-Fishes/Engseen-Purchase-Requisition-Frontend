type BlobFileDownloadService = (blob: Blob, fileName: string, fileExtension: string) => void;

/**
 * Util function to download blob as a file with proper name and extension
 * @param blob file content loaded into a blob
 * @param fileName how would the file be named after downloaded
 * @param fileExtension extension of file: pdf/jpg/etc...
 */
export const downloadBlobAsFileWithNameAndExtension: BlobFileDownloadService = (blob, fileName, fileExtension) => {

    /**
     * Create an invisible HTML link element
     */
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.style.display = "none"

    /**
     * Set the download name of the link
     */
    link.download = `${fileName}.${fileExtension}`;

    /**
     * Create an intermediate href for the blob in memory and set it as href of the link
     */
    link.href = URL.createObjectURL(blob);

    /**
     * Programmatically trigger click event of the link
     */
    link.click();

    /**
     * Revoke the link to free up memory
     */
    URL.revokeObjectURL(link.href);
};
