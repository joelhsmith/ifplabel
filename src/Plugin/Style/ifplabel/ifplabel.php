<?php
/**
 * @file
 * Style: ifplabel.
 */

namespace Drupal\ifplabel\Plugin\Style\ifplabel;
use Drupal\openlayers\Component\Annotation\OpenlayersPlugin;
use Drupal\openlayers\Openlayers;
use Drupal\openlayers\Types\Style;

/**
 * Class ifplabel.
 *
 * @OpenlayersPlugin(
 *  id = "ifplabel"
 * )
 */
class ifplabel extends Style {
  /**
   * {@inheritdoc}
   */
  public function optionsForm(array &$form, array &$form_state) {
    $form['options']['default']['image']['fill']['color'] = array(
      '#type' => 'textfield',
      '#title' => 'Fill color',
      '#field_prefix' => 'rgba(',
      '#field_suffix' => ')',
      '#default_value' => $this->getOption(array('default', 'image', 'fill', 'color'), '255,255,255,0.4'),
      '#required' => TRUE,
    );
  }



  /**
   * {@inheritdoc}
   */
  public function optionsFormSubmit(array $form, array &$form_state) {
    parent::optionsFormSubmit($form, $form_state);

    $options = $this->getOptions();

    $this->setOptions($options);
    $form_state['values']['options'] = $options;
    parent::optionsFormSubmit($form, $form_state);
  }

}
