export function NewComment() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-500 text-white">
            YR
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Adicione um comentário..."
            rows={2}
          ></textarea>

          <div className="flex justify-end mt-2">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Comentar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
