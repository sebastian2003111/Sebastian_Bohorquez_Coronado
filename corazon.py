import time 

class color: 
    RED = '\x1b[0,31;50m'
    BOLD_RED = '\x1b[1,31;50m'
    NORMAL = '\x1b[0m'

def carga_corazon():
    with open("heart_pattern.txt", "r") as f:
        return f.read()

def romantizar(nombre):
    corazon = carga_corazon()
    letras = list(nombre)
    i = 0
    while '@' in corazon:
        corazon = corazon.replace('@', letras[i % len(letras)], 1)
        i += 1
    return corazon

def main():
    nombre = input("Ingrese el nombre de tu persona especial: ").strip() or "Amor"
    corazon = romantizar(nombre)

    print(f"{color.BOLD_RED} ... Formando corazon... {color.NORMAL}\n")

    for linea in corazon.split('\n'):
        print(f"{color.RED}{linea}{color.NORMAL}")
        time.sleep(0.3)

    print(f"\n{color.BOLD_RED}¡Te Amo, {nombre}!{color.NORMAL}")

if __name__ == "__main__":
    main()