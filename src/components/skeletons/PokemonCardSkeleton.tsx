export function PokemonCardSkeleton({heigth='h-24'} : {heigth?: string}){
    return (
        <div 
        className={`pokemon-card w-24 ${heigth} rounded p-1 text-center shadow-md overflow-hidden cursor-pointer hover:bg-white/10`}>
            <figure className="bg-black/10 rounded flex w-full h-full items-center justify-center">
                <div className="w-20" ></div>
            </figure>
        </div>
    )
}