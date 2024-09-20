export async function deleteChat(chatId: number): Promise<void> {
  try {
    const response = await fetch(`/api/delete-chat?chatId=${chatId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete chat");
    }
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
}