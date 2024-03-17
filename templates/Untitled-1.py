def closest_color(pixels):
    # Convert binary strings to integer values
    red_value = int(pixels[0:8], 2)
    green_value = int(pixels[8:16], 2)
    blue_value = int(pixels[16:24], 2)

    # Pre-defined color distances
    colors = ["Black", "White", "Red", "Green", "Blue"]
    distances = [0] * len(colors)

    # Calculate distances
    distances[0] = ((red_value - 0)**2 + (green_value - 0)**2 + (blue_value - 0)**2)*0.5
    distances[1] = ((red_value - 255)**2 + (green_value - 255)**2 + (blue_value - 255)**2)*0.5
    distances[2] = ((red_value - 255)**2 + (green_value - 0)**2 + (blue_value - 0)**2)*0.5
    distances[3] = ((red_value - 0)**2 + (green_value - 255)**2 + (blue_value - 0)**2)*0.5
    distances[4] = ((red_value - 0)**2 + (green_value - 0)**2 + (blue_value - 255)**2)*0.5

    # Find the closest color
    min_distance = min(distances)
    closest_color = colors[distances.index(min_distance)]

    # Check for any other color with the same minimum distance
    if distances.count(min_distance) > 1:
        closest_color = "Ambiguous"

    return closest_color

if __name__ == '__main__':
    pixel_array = [
        "101111010110011011100100", 
        "110000010101011111101111",
        "100110101100111111101101",
        "010111011010010110000011",
        "000000001111111111111111"
    ]
    result = [closest_color(pixels_item) for pixels_item in pixel_array]

    print("Closest colors:")
    for color in result:
        print(color)
