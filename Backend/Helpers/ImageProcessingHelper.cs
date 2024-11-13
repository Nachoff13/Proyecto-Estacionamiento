namespace Helpers
{
    public static class ImageProcessingHelper
    {
        public static byte[] ImagenAByte(string bytes)
        {
            string[] bytesValues = bytes.Split(',');
            byte[] imageBytes = new byte[bytesValues.Length];
            for (int i = 0; i < bytesValues.Length; i++)
            {
                imageBytes[i] = Convert.ToByte(bytesValues[i]);
            }
            return imageBytes;
        }

        public static string ByteAImagen(byte[] bytes)
        {
            string bytesString = string.Join(",", bytes);
            return bytesString;
        }
    }
}
